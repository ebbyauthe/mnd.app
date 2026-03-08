import { NextResponse } from "next/server";
import { getCurrentUserFromCookieHeader } from "@/lib/auth";
import { findSubjectById } from "@/lib/subjects";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const subject = await findSubjectById(id);
  if (!subject) {
    return NextResponse.json({ error: "Subject not found." }, { status: 404 });
  }

  const user = await getCurrentUserFromCookieHeader(request.headers.get("cookie"));
  if (subject.userId && subject.userId !== user?.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ subject });
}
