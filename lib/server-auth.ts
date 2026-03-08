import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUserFromCookieHeader } from "@/lib/auth";

export async function requireUser(nextPath: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((entry) => `${entry.name}=${encodeURIComponent(entry.value)}`)
    .join("; ");

  const user = await getCurrentUserFromCookieHeader(cookieHeader);
  if (!user) {
    redirect(`/auth?mode=login&next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}
