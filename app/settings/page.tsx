import Link from "next/link";
import SettingsForm from "./settings-form";
import { requireUser } from "@/lib/server-auth";

export default async function SettingsPage() {
  const user = await requireUser("/settings");

  return (
    <main className="min-h-[calc(100vh-56px)] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="ui-kicker">Account</p>
            <h1 className="mt-2 text-3xl font-bold">Settings</h1>
          </div>
          <Link href="/profile" className="ui-btn-secondary px-4 py-2 text-sm">
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
