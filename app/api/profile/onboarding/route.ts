import { NextResponse } from "next/server";
import { completeUserOnboarding, getCurrentUserFromCookieHeader, toPublicUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUserFromCookieHeader(request.headers.get("cookie"));
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as {
      preferredName?: string;
      preferredLanguage?: string;
      heardFrom?: string;
      learnerType?: string;
    };

    const preferredName = body.preferredName?.trim() ?? "";
    const preferredLanguage = body.preferredLanguage?.trim() ?? "";
    const heardFrom = body.heardFrom?.trim() ?? "";
    const learnerType = body.learnerType?.trim() ?? "";

    if (!preferredName || preferredName.length < 2) {
      return NextResponse.json({ error: "Preferred name must be at least 2 characters." }, { status: 400 });
    }

    if (!preferredLanguage || !heardFrom || !learnerType) {
      return NextResponse.json({ error: "All onboarding fields are required." }, { status: 400 });
    }

    const updated = await completeUserOnboarding(currentUser.id, {
      preferredName,
      preferredLanguage,
      heardFrom,
      learnerType,
    });

    if (!updated) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user: toPublicUser(updated), message: "Onboarding completed." });
  } catch {
    return NextResponse.json({ error: "Failed to complete onboarding." }, { status: 500 });
  }
}
