import Link from "next/link";

const features = [
  {
    title: "Upload Notes",
    description: "Upload or paste notes, then get a simple explanation.",
    href: "/upload",
    available: true,
  },
  {
    title: "Quick Summary",
    description: "Exam-focused key points from your material.",
    href: "#",
    available: false,
  },
  {
    title: "Deep Explanation",
    description: "Step-by-step understanding with examples and analogies.",
    href: "#",
    available: false,
  },
  {
    title: "Practice Quiz",
    description: "Auto-generated questions to test understanding.",
    href: "#",
    available: false,
  },
  {
    title: "Flashcards",
    description: "Turn notes into front/back revision cards.",
    href: "#",
    available: false,
  },
  {
    title: "Ask Questions",
    description: "Chat with your notes for targeted clarification.",
    href: "#",
    available: false,
  },
  {
    title: "Profile",
    description: "View account, verification status, and personal bio.",
    href: "/profile",
    available: true,
  },
  {
    title: "Settings",
    description: "Edit profile and resend email verification link.",
    href: "/settings",
    available: true,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest" style={{ color: "var(--app-muted)" }}>
              Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">mnd.app</h1>
            <p className="mt-3 max-w-2xl" style={{ color: "var(--app-muted)" }}>
              Your AI study control panel. Start with upload notes, then unlock summaries,
              quizzes, flashcards, and Q&amp;A.
            </p>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-xs"
            style={{ borderColor: "var(--app-border)", color: "var(--app-muted)" }}
          >
            First feature live
          </span>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) =>
            feature.available ? (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-2xl border p-5 transition"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                  {feature.description}
                </p>
                <p className="mt-5 text-sm font-medium" style={{ color: "var(--app-accent)" }}>
                  Open feature -&gt;
                </p>
              </Link>
            ) : (
              <article
                key={feature.title}
                className="rounded-2xl border p-5 opacity-70"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                  {feature.description}
                </p>
                <p className="mt-5 text-sm" style={{ color: "var(--app-muted)" }}>
                  Coming soon
                </p>
              </article>
            ),
          )}
        </section>

        <div className="mt-10">
          <Link
            href="/upload"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: "var(--app-accent-strong)" }}
          >
            Start with Upload Notes
          </Link>
        </div>
      </div>
    </main>
  );
}
