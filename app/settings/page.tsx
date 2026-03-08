import Link from "next/link";
import SettingsForm from "./settings-form";
import { requireUser } from "@/lib/server-auth";

export default async function SettingsPage() {
  const user = await requireUser("/settings");

  return (
    <main className="min-h-[calc(100vh-56px)] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Link
            href="/profile"
            className="rounded-xl border px-4 py-2 text-sm"
            style={{ borderColor: "var(--app-border)" }}
          >
            Back to Profile
          </Link>
        </div>

        <SettingsForm
          initialUser={{
            name: user.name,
            bio: user.bio,
            verified: user.verified,
          }}
        />
      </div>
    </main>
  );
}
