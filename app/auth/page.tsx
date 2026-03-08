"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type AuthMode = "login" | "signup";

type ApiResponse = {
  error?: string;
  message?: string;
  verificationUrl?: string;
};

const PROVIDERS = ["google", "apple", "phone", "facebook", "discord"] as const;

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const providerError = searchParams.get("error") ?? "";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(providerError);
  const [verificationUrl, setVerificationUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const title = useMemo(
    () => (mode === "login" ? "Login to mnd.app" : "Create your mnd.app account"),
    [mode],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    setVerificationUrl("");

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const payload =
        mode === "login" ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        setError(data.error ?? "Authentication failed.");
        return;
      }

      setMessage(data.message ?? "Success.");
      if (data.verificationUrl) setVerificationUrl(data.verificationUrl);
      router.refresh();

      if (mode === "login") {
        router.push(nextPath);
      } else {
        setMode("login");
      }
    } catch {
      setError("Unexpected authentication error.");
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
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
          Use email/password or continue with a provider.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className="rounded-xl border px-3 py-2 text-sm font-medium"
            style={{
              borderColor: "var(--app-border)",
              backgroundColor: mode === "login" ? "var(--app-bg)" : "transparent",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="rounded-xl border px-3 py-2 text-sm font-medium"
            style={{
              borderColor: "var(--app-border)",
              backgroundColor: mode === "signup" ? "var(--app-bg)" : "transparent",
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {mode === "signup" ? (
            <label className="block text-sm font-medium">
              Name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)" }}
              />
            </label>
          ) : null}

          <label className="block text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)" }}
            />
          </label>

          <label className="block text-sm font-medium">
            Password
            <input
              required
              type="password"
              minLength={mode === "signup" ? 8 : undefined}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)" }}
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-70"
            style={{ backgroundColor: "var(--app-accent-strong)" }}
          >
            {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="my-5 text-center text-xs" style={{ color: "var(--app-muted)" }}>
          OR CONTINUE WITH
        </p>

        <div className="grid grid-cols-2 gap-2">
          {PROVIDERS.map((provider) => (
            <a
              key={provider}
              href={`/api/auth/oauth/${provider}?next=${encodeURIComponent(nextPath)}`}
              className="rounded-xl border px-3 py-2 text-center text-sm capitalize"
              style={{ borderColor: "var(--app-border)" }}
            >
              {provider}
            </a>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm" style={{ color: "var(--app-accent-strong)" }}>
            {error}
          </p>
        ) : null}

        {message ? <p className="mt-4 text-sm">{message}</p> : null}
        {verificationUrl ? (
          <Link href={verificationUrl} className="mt-2 inline-block underline text-sm">
            Verify email now
          </Link>
        ) : null}

        <p className="mt-6 text-sm" style={{ color: "var(--app-muted)" }}>
          By continuing you agree to account security and verification rules.
        </p>
      </div>
    </main>
  );
}
