import crypto from "crypto";
import { NextResponse } from "next/server";

const OAUTH_STATE_COOKIE = "lerna_oauth_state";
const OAUTH_NEXT_COOKIE = "lerna_oauth_next";

function errorRedirect(origin: string, next: string, message: string) {
  const authUrl = new URL("/auth", origin);
  authUrl.searchParams.set("mode", "login");
  authUrl.searchParams.set("next", next);
  authUrl.searchParams.set("error", message);
  return NextResponse.redirect(authUrl);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/api/auth/oauth/${provider}/callback`;

  let providerAuthorizeUrl: URL | null = null;

  if (provider === "google") {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return errorRedirect(url.origin, next, "Google login is not configured.");
    }

    providerAuthorizeUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    providerAuthorizeUrl.searchParams.set("client_id", clientId);
    providerAuthorizeUrl.searchParams.set("redirect_uri", redirectUri);
    providerAuthorizeUrl.searchParams.set("response_type", "code");
    providerAuthorizeUrl.searchParams.set("scope", "openid email profile");
    providerAuthorizeUrl.searchParams.set("state", state);
    providerAuthorizeUrl.searchParams.set("access_type", "offline");
    providerAuthorizeUrl.searchParams.set("prompt", "consent");
  } else if (provider === "discord") {
    const clientId = process.env.DISCORD_CLIENT_ID;
    if (!clientId) {
      return errorRedirect(url.origin, next, "Discord login is not configured.");
    }

    providerAuthorizeUrl = new URL("https://discord.com/oauth2/authorize");
    providerAuthorizeUrl.searchParams.set("client_id", clientId);
    providerAuthorizeUrl.searchParams.set("redirect_uri", redirectUri);
    providerAuthorizeUrl.searchParams.set("response_type", "code");
    providerAuthorizeUrl.searchParams.set("scope", "identify email");
    providerAuthorizeUrl.searchParams.set("state", state);
  } else {
    return errorRedirect(
      url.origin,
      next,
      `${provider} login is not implemented yet. Use Google or Discord for now.`,
    );
  }

  const response = NextResponse.redirect(providerAuthorizeUrl);
  response.cookies.set({
    name: OAUTH_STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  response.cookies.set({
    name: OAUTH_NEXT_COOKIE,
    value: next,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}
