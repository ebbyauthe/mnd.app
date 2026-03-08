import { NextResponse } from "next/server";
import {
  getCurrentUserFromCookieHeader,
  toPublicUser,
  updateUserProfile,
} from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getCurrentUserFromCookieHeader(request.headers.get("cookie"));
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUserFromCookieHeader(request.headers.get("cookie"));
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as { name?: string; bio?: string };
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const bio = typeof body.bio === "string" ? body.bio.trim() : undefined;

    if (name !== undefined && name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    const updated = await updateUserProfile(currentUser.id, { name, bio });
    if (!updated) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      user: toPublicUser(updated),
      message: "Profile updated.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
