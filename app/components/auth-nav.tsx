"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
};

export default function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          if (isMounted) setUser(null);
          return;
        }

        const payload = (await response.json()) as { user: User };
        if (isMounted) setUser(payload.user);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth?mode=login";
  }

  if (isLoading) {
    return (
      <span className="text-xs" style={{ color: "var(--app-muted)" }}>
        ...
      </span>
    );
  }

  if (!user) {
    return (
      <>
        <Link href="/auth?mode=login" className="hover:opacity-80">
          SignUp/Login
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/profile" className="hover:opacity-80">
        Profile
      </Link>
      <Link href="/settings" className="hover:opacity-80">
        Settings
      </Link>
      <button type="button" onClick={logout} className="hover:opacity-80">
        Logout
      </button>
    </>
  );
}
