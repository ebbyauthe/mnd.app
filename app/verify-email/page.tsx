"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type VerifyResponse = {
  error?: string;
  message?: string;
};

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function verify() {
    if (!token) {
      setError("Missing token.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const payload = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        setError(payload.error ?? "Verification failed.");
        return;
      }

      setMessage(payload.message ?? "Email verified.");
    } catch {
      setError("Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-56px)] px-6 py-12">
      <div
        className="mx-auto max-w-md rounded-2xl border p-6"
        style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
      >
        <h1 className="text-3xl font-bold">Verify Email</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
          Confirm your account to unlock verified status.
        </p>

        <button
          type="button"
          onClick={verify}
          disabled={isLoading || !token}
          className="mt-6 w-full rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-70"
          style={{ backgroundColor: "var(--app-accent-strong)" }}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>

        {error ? (
          <p className="mt-4 text-sm" style={{ color: "var(--app-accent-strong)" }}>
            {error}
          </p>
        ) : null}
        {message ? <p className="mt-4 text-sm">{message}</p> : null}

        <div className="mt-6 flex gap-4 text-sm">
          <Link href="/profile" className="underline" style={{ color: "var(--app-accent-strong)" }}>
            Go to Profile
          </Link>
          <Link href="/settings" className="underline" style={{ color: "var(--app-accent-strong)" }}>
            Settings
          </Link>
        </div>
      </div>
    </main>
  );
}
