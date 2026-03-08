import { NextResponse } from "next/server";
import { getCurrentUserFromCookieHeader, toPublicUser } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getCurrentUserFromCookieHeader(request.headers.get("cookie"));
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
