"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [{ href: "/studyroom", label: "Studyroom" }];

export default function PrimaryNav() {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`) || pathname === "/dashboard";
        return (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-transparent px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:border-white/25 hover:shadow-[0_0_20px_rgba(123,163,255,0.25)]"
            style={{
              backgroundColor: "transparent",
              color: "#e6eeff",
              boxShadow: active
                ? "0 0 0 1px color-mix(in srgb, var(--app-accent-strong) 45%, transparent), 0 0 20px color-mix(in srgb, var(--app-accent) 25%, transparent)"
                : "none",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
