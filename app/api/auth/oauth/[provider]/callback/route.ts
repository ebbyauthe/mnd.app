import { NextResponse } from "next/server";
import {
  createSessionToken,
  OAuthProvider,
  setSessionCookie,
  upsertOAuthUser,
} from "@/lib/auth";

const OAUTH_STATE_COOKIE = "lerna_oauth_state";
const OAUTH_NEXT_COOKIE = "lerna_oauth_next";

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rawValue] = part.trim().split("=");
    if (!rawKey || rawValue.length === 0) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join("="));
    return acc;
  }, {});
}

function sanitizeNextPath(next: string | undefined): string {
  if (!next) return "/dashboard";
  return next.startsWith("/") ? next : "/dashboard";
}

function redirectWithError(origin: string, next: string, message: string): NextResponse {
  const authUrl = new URL("/auth", origin);
  authUrl.searchParams.set("mode", "login");
  authUrl.searchParams.set("next", next);
  authUrl.searchParams.set("error", message);
  return NextResponse.redirect(authUrl);
}

async function exchangeGoogleCode(code: string, redirectUri: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth is not configured.");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to exchange Google authorization code.");
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error("Google token response missing access token.");
  }

  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  if (!profileResponse.ok) {
    throw new Error("Failed to fetch Google profile.");
  }

  const profile = (await profileResponse.json()) as {
    sub?: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
  };

  if (!profile.sub || !profile.email) {
    throw new Error("Google profile missing id or email.");
  }

  return {
    provider: "google" as OAuthProvider,
    providerUserId: profile.sub,
    email: profile.email,
    name: profile.name ?? profile.email.split("@")[0],
    verified: profile.email_verified ?? false,
  };
}

async function exchangeDiscordCode(code: string, redirectUri: string) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Discord OAuth is not configured.");
  }

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to exchange Discord authorization code.");
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error("Discord token response missing access token.");
  }

  const profileResponse = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  if (!profileResponse.ok) {
    throw new Error("Failed to fetch Discord profile.");
  }

  const profile = (await profileResponse.json()) as {
    id?: string;
    username?: string;
    global_name?: string;
    email?: string;
    verified?: boolean;
  };

  if (!profile.id || !profile.email) {
    throw new Error("Discord profile missing id or email.");
  }

  return {
    provider: "discord" as OAuthProvider,
    providerUserId: profile.id,
    email: profile.email,
    name: profile.global_name ?? profile.username ?? profile.email.split("@")[0],
    verified: profile.verified ?? false,
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookies = parseCookies(request.headers.get("cookie"));
  const cookieState = cookies[OAUTH_STATE_COOKIE];
  const nextPath = sanitizeNextPath(cookies[OAUTH_NEXT_COOKIE]);

  if (!code || !state || !cookieState || state !== cookieState) {
    return redirectWithError(url.origin, nextPath, "Invalid OAuth state. Please retry login.");
  }

  const redirectUri = `${url.origin}/api/auth/oauth/${provider}/callback`;

  try {
    const oauthIdentity =
      provider === "google"
        ? await exchangeGoogleCode(code, redirectUri)
        : provider === "discord"
          ? await exchangeDiscordCode(code, redirectUri)
          : null;

    if (!oauthIdentity) {
      return redirectWithError(
        url.origin,
        nextPath,
        `${provider} login is not implemented yet.`,
      );
    }

    const user = await upsertOAuthUser(oauthIdentity);
    const sessionToken = createSessionToken(user.id);
    const response = NextResponse.redirect(new URL(nextPath, url.origin));
    setSessionCookie(response, sessionToken);
    response.cookies.set({ name: OAUTH_STATE_COOKIE, value: "", path: "/", maxAge: 0 });
    response.cookies.set({ name: OAUTH_NEXT_COOKIE, value: "", path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "OAuth login failed.";
    const response = redirectWithError(url.origin, nextPath, message);
    response.cookies.set({ name: OAUTH_STATE_COOKIE, value: "", path: "/", maxAge: 0 });
    response.cookies.set({ name: OAUTH_NEXT_COOKIE, value: "", path: "/", maxAge: 0 });
    return response;
  }
}
