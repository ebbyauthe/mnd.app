import { NextResponse } from "next/server";
import { markUserVerified, verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = body.token ?? "";

    if (!token) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.purpose !== "verify") {
      return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 400 });
    }

    const user = await markUserVerified(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Email verified successfully." });
  } catch {
    return NextResponse.json({ error: "Failed to verify email." }, { status: 500 });
  }
}
