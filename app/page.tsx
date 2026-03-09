import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUserFromCookieHeader } from "@/lib/auth";
import ReviewsCarousel from "@/app/components/reviews-carousel";
import PricingSection from "@/app/components/pricing-section";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((entry) => `${entry.name}=${encodeURIComponent(entry.value)}`)
    .join("; ");
  const user = await getCurrentUserFromCookieHeader(cookieHeader);

  if (user) {
    redirect("/studyroom");
  }

  const testimonials = [
    {
      quote:
        "The progress tracking system is genius. Seeing my level move from unlearned to mastered keeps me motivated.",
      name: "Emran",
      gpa: "4.0 GPA",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
    {
      quote:
        "I was skeptical at first, but Lerna transformed my study routine. The quizzes are spot-on and feedback helps me improve fast.",
      name: "Alain",
      gpa: "3.98 GPA",
      avatar: "https://i.pravatar.cc/120?img=15",
    },
    {
      quote:
        "The flashcard feature is a game-changer. It turns my lecture notes into practice in minutes and improved my test scores.",
      name: "Emily",
      gpa: "4.0 GPA",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
    {
      quote:
        "I use it daily for assignments and revision. It explains tough ideas simply and saves me hours every week.",
      name: "David",
      gpa: "3.95 GPA",
      avatar: "https://i.pravatar.cc/120?img=68",
    },
    {
      quote:
        "My exam prep feels organized now. The study guide and quiz flow helped me jump from average to top scores.",
      name: "Sophia",
      gpa: "3.94 GPA",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      quote:
        "I upload lecture slides and instantly get useful summaries. It makes long chapters much easier to remember.",
      name: "Noah",
      gpa: "3.91 GPA",
      avatar: "https://i.pravatar.cc/120?img=53",
    },
    {
      quote:
        "The explain mode breaks down difficult theories in plain language. It feels like a personal tutor every day.",
      name: "Ava",
      gpa: "3.97 GPA",
      avatar: "https://i.pravatar.cc/120?img=5",
    },
    {
      quote:
        "I used to reread notes for hours. Now I practice with targeted questions and retain way more information.",
      name: "Liam",
      gpa: "3.9 GPA",
      avatar: "https://i.pravatar.cc/120?img=23",
    },
    {
      quote:
        "The platform helped me track weak topics and fix them before finals. My confidence is way higher now.",
      name: "Zara",
      gpa: "3.96 GPA",
      avatar: "https://i.pravatar.cc/120?img=48",
    },
    {
      quote:
        "I love how the flashcards stay short and meaningful. Perfect for quick revision between classes.",
      name: "Michael",
      gpa: "3.89 GPA",
      avatar: "https://i.pravatar.cc/120?img=66",
    },
    {
      quote:
        "Assignment prep is smoother now. I ask questions from my own notes and get clear, relevant answers.",
      name: "Fatima",
      gpa: "4.0 GPA",
      avatar: "https://i.pravatar.cc/120?img=44",
    },
    {
      quote:
        "The studyroom tabs keep everything in one place. I can switch from guide to quiz without losing flow.",
      name: "Ethan",
      gpa: "3.93 GPA",
      avatar: "https://i.pravatar.cc/120?img=58",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-56px)] overflow-x-clip px-2.5 py-3 sm:px-5 md:px-6 md:py-8">
      <section className="mx-auto max-w-7xl">
        <div
          className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden px-3 py-7 sm:px-6 sm:py-12 md:py-16"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="order-2 relative min-h-[240px] sm:min-h-[380px] lg:order-1">
              <div
                className="rounded-3xl border p-4 md:hidden"
                style={{
                  borderColor: "var(--app-border)",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--app-card) 90%, var(--app-bg) 10%), color-mix(in srgb, var(--app-bg) 78%, var(--app-card) 22%))",
                  boxShadow: "0 0 70px color-mix(in srgb, var(--app-accent) 20%, transparent)",
                }}
              >
                <div className="rounded-2xl border p-3" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: "var(--app-muted)" }}>Studyroom preview</p>
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                      style={{
                        borderColor: "var(--app-border)",
                        color: "var(--app-accent-strong)",
                        backgroundColor: "color-mix(in srgb, var(--app-accent) 10%, transparent)",
                      }}
                    >
                      Session active
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {[
                      { step: "STEP 1", title: "Upload notes", text: "PDF, text, audio, or YouTube links" },
                      { step: "STEP 2", title: "Generate study guide", text: "Clear explanations and examples" },
                      { step: "STEP 3", title: "Practice + retain", text: "Flashcards, quizzes, and progress tracking" },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="rounded-xl border p-3"
                        style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 92%, var(--app-bg) 8%)" }}
                      >
                        <p className="text-[11px] font-semibold" style={{ color: "var(--app-accent-strong)" }}>{item.step}</p>
                        <p className="mt-1 text-lg font-bold">{item.title}</p>
                        <p className="mt-1 text-xs" style={{ color: "var(--app-muted)" }}>{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-2.5" style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 94%, var(--app-bg) 6%)" }}>
                      <p className="text-[11px]" style={{ color: "var(--app-muted)" }}>Current Topic</p>
                      <p className="mt-0.5 text-base font-bold">Cell Biology</p>
                    </div>
                    <div className="rounded-lg border p-2.5" style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 94%, var(--app-bg) 6%)" }}>
                      <p className="text-[11px]" style={{ color: "var(--app-muted)" }}>Mastery</p>
                      <p className="mt-0.5 text-base font-bold">74%</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-medium" style={{ color: "var(--app-muted)" }}>Progress this week</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--app-border) 55%, transparent)" }}>
                      <div className="h-full w-[62%] rounded-full" style={{ background: "linear-gradient(90deg, var(--app-accent-strong), var(--app-accent))" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 hidden rounded-3xl border md:block"
                style={{
                  borderColor: "var(--app-border)",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--app-card) 90%, var(--app-bg) 10%), color-mix(in srgb, var(--app-bg) 78%, var(--app-card) 22%))",
                  boxShadow: "0 0 120px color-mix(in srgb, var(--app-accent) 24%, transparent)",
                }}
              />

              <div
                className="absolute left-[8%] top-[16%] hidden w-[84%] rounded-2xl border p-3 shadow-2xl sm:p-5 md:block"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold" style={{ color: "var(--app-muted)" }}>Studyroom live preview</p>
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: "var(--app-border)",
                      color: "var(--app-accent-strong)",
                      backgroundColor: "color-mix(in srgb, var(--app-accent) 12%, transparent)",
                    }}
                  >
                    Session active
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Current Topic", value: "Cell Biology" },
                    { label: "Mastery", value: "74%" },
                    { label: "Streak", value: "12 days" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border p-3"
                      style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 92%, var(--app-bg) 8%)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--app-muted)" }}>{item.label}</p>
                      <p className="mt-1 text-lg font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium" style={{ color: "var(--app-muted)" }}>
                    Progress this week
                  </p>
                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--app-border) 55%, transparent)" }}
                  >
                    <div className="hero-progress h-full rounded-full" />
                  </div>
                </div>
              </div>

              <div
                className="hero-float-a absolute left-[4%] top-[6%] hidden w-52 rounded-2xl border p-4 md:block"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "var(--app-accent-strong)" }}>
                  STEP 1
                </p>
                <p className="mt-2 text-xl font-bold">Upload notes</p>
                <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                  PDF, text, audio, or YouTube links
                </p>
              </div>

              <div
                className="hero-float-b absolute right-[4%] top-[10%] hidden w-56 rounded-2xl border p-4 md:block"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "var(--app-accent-strong)" }}>
                  STEP 2
                </p>
                <p className="mt-2 text-xl font-bold">Generate study guide</p>
                <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                  Clear explanations and examples
                </p>
              </div>

              <div
                className="hero-float-c absolute bottom-[7%] right-[10%] hidden w-60 rounded-2xl border p-4 md:block"
                style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "var(--app-accent-strong)" }}>
                  STEP 3
                </p>
                <p className="mt-2 text-xl font-bold">Practice + retain</p>
                <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                  Flashcards, quizzes, and progress tracking
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold"
                style={{ borderColor: "var(--app-border)", color: "var(--app-accent-strong)" }}
              >
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: "var(--app-accent-strong)",
                    color: "white",
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                TRUSTED BY STUDENTS
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.02] sm:text-5xl md:text-7xl">
                Learn Smarter...
                <br />
                <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                  Not Harder.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-lg" style={{ color: "var(--app-muted)" }}>
                Turn notes and lectures into AI flashcards, study guides, and quiz practice. Focus on learning, not formatting.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold sm:text-xs" style={{ color: "var(--app-muted)" }}>
                {["PDFS - IMAGES - AUDIO", "FLASHCARDS - NOTES - QUIZZES", "WEB"].map((chip) => (
                  <span key={chip} className="rounded-full border px-4 py-2" style={{ borderColor: "var(--app-border)" }}>
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/studyroom"
                  className="rounded-full px-8 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(47,124,240,0.45)]"
                  style={{ background: "linear-gradient(135deg, var(--app-accent-strong), var(--app-accent))" }}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative left-1/2 right-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden px-3 py-7 sm:px-6 sm:py-8"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-base font-medium sm:text-xl md:text-3xl">
              Students at leading universities and organizations trust lerna.ai
            </p>

            <div className="trust-marquee mt-8">
              <div className="trust-track">
                {[
                  { name: "MIT", src: "/logos/mit-logo.png" },
                  { name: "Stanford", src: "/logos/stanford-wordmark.avif" },
                  { name: "Yale", src: "/logos/yale-logo.png" },
                  { name: "UPenn", src: "/logos/upenn-logo.svg" },
                  { name: "Georgia Tech", src: "/logos/georgia-tech-logo.png" },
                  { name: "Cambridge", src: "/logos/cambridge-logo.svg" },
                ].map((item) => (
                  <span key={`a-${item.name}`} className="trust-item">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="trust-logo"
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
              <div className="trust-track" aria-hidden="true">
                {[
                  { name: "MIT", src: "/logos/mit-logo.png" },
                  { name: "Stanford", src: "/logos/stanford-wordmark.avif" },
                  { name: "Yale", src: "/logos/yale-logo.png" },
                  { name: "UPenn", src: "/logos/upenn-logo.svg" },
                  { name: "Georgia Tech", src: "/logos/georgia-tech-logo.png" },
                  { name: "Cambridge", src: "/logos/cambridge-logo.svg" },
                ].map((item) => (
                  <span key={`b-${item.name}`} className="trust-item">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="trust-logo"
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-3 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold sm:text-4xl md:text-5xl">Our Process</h2>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div
                    className="rounded-3xl p-6"
                    style={{
                      backgroundColor: "var(--app-bg)",
                      color: "var(--app-fg)",
                      boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--app-border) 45%, transparent)",
                    }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--app-muted)" }}>
                      Quick Start
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-4xl">Hey David, what are you studying today?</h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--app-muted)" }}>
                      Choose how you want to begin and Lerna will build your study set instantly.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Upload", icon: "↑", hint: "Files, docs, slides" },
                        { label: "Paste", icon: "⛓", hint: "Text, links, notes" },
                        { label: "Record", icon: "●", hint: "Live class audio" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_22px_rgba(47,124,240,0.16)]"
                          style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
                        >
                          <p className="text-sm font-semibold">
                            <span className="mr-2" style={{ color: "var(--app-accent-strong)" }}>{item.icon}</span>
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs" style={{ color: "var(--app-muted)" }}>
                            {item.hint}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug sm:text-2xl md:text-3xl">
                  <span style={{ color: "var(--app-accent-strong)" }}>Upload or Paste Content:</span> Whether it is your class notes, a YouTube video, or a webpage.
                </p>
              </article>

              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl p-6" style={{ backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <div className="rounded-2xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                      <p className="text-center text-base">What causes Earth&apos;s seasons?</p>
                    </div>
                    <div className="-mt-2 ml-auto w-[85%] rounded-2xl border p-6 shadow-md" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                      <p className="text-center text-base">Earth&apos;s tilt and orbit around the Sun.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug sm:text-2xl md:text-3xl">
                  <span style={{ color: "var(--app-accent-strong)" }}>Instant Flashcards:</span> Turn hours of study into minutes with AI generated flashcards.
                </p>
              </article>

              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl p-6" style={{ backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "var(--app-card)" }}>
                        <p className="text-4xl font-bold">86%</p>
                        <p className="text-xs font-semibold" style={{ color: "var(--app-muted)" }}>Overall Grade</p>
                      </div>
                      <div className="rounded-xl p-4" style={{ backgroundColor: "var(--app-card)" }}>
                        <p className="text-lg font-bold">Detailed Feedback</p>
                        <div className="mt-2 space-y-2 text-xs" style={{ color: "var(--app-muted)" }}>
                          <p>Excellent explanation of core ideas and evidence.</p>
                          <p>Clear writing with strong topic structure.</p>
                          <p>Improve examples depth in one section.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug sm:text-2xl md:text-3xl">
                  <span style={{ color: "var(--app-accent-strong)" }}>Smart Paper Grading:</span> Get detailed feedback based on your rubric.
                </p>
              </article>

              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <p className="text-2xl font-bold sm:text-3xl">Calculus &amp; Functions</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>63</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>Unlearned</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>2</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fcd34d" }}>Learning</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>6</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(59,130,246,0.15)", color: "#93c5fd" }}>Learned</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>9</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#86efac" }}>Mastered</span></p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug sm:text-2xl md:text-3xl">
                  <span style={{ color: "var(--app-accent-strong)" }}>Track Your Progress:</span> Monitor your growth and master subjects faster.
                </p>
              </article>
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/dashboard"
                className="rounded-2xl px-7 py-3 text-lg font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_26px_rgba(47,124,240,0.5)] sm:px-12 sm:py-4 sm:text-4xl"
                style={{ background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden px-3 py-10 sm:px-6 sm:py-14"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              Trusted by 100k+ students
            </h2>

            <ReviewsCarousel testimonials={testimonials} />
          </div>
        </div>

        <div
          className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-3 py-10 sm:px-6 sm:py-14"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              Why Students Choose Lerna Over Old Study Habits
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-center text-base sm:text-xl" style={{ color: "var(--app-muted)" }}>
              Lerna helps you study with less stress and better results by turning your class material into focused,
              practical learning workflows.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "Memory That Actually Sticks",
                  icon: "📘",
                  tone: "color-mix(in srgb, #34d399 28%, var(--app-card))",
                  old: [
                    "Passive rereading with low retention",
                    "Random revision with no system",
                    "No clear signal on weak concepts",
                  ],
                  newWay: [
                    "Active-recall prompts from your own notes",
                    "Spaced review flow built into study sessions",
                    "Immediate feedback on what to relearn",
                  ],
                },
                {
                  title: "Faster Start, Better Personalization",
                  icon: "⚡",
                  tone: "color-mix(in srgb, #f59e0b 24%, var(--app-card))",
                  old: [
                    "Long prep before real studying begins",
                    "One-size-fits-all study materials",
                    "Difficult to adjust as exams get closer",
                  ],
                  newWay: [
                    "Upload once and generate study assets instantly",
                    "Explanations matched to your level",
                    "Practice set adapts with your progress",
                  ],
                },
                {
                  title: "More Value in One Studyroom",
                  icon: "$",
                  tone: "color-mix(in srgb, #a78bfa 24%, var(--app-card))",
                  old: [
                    "Paying for multiple disconnected tools",
                    "Costly tutoring for routine review",
                    "Limited help outside fixed schedules",
                  ],
                  newWay: [
                    "All core study modes in one platform",
                    "Affordable plans with practical coverage",
                    "Anytime access across your study workflow",
                  ],
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-3xl border"
                  style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
                >
                  <div className="border-b p-6" style={{ borderColor: "var(--app-border)", backgroundColor: card.tone }}>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: "color-mix(in srgb, white 70%, transparent)" }}>
                      {card.icon}
                    </div>
                    <p className="text-2xl font-bold">{card.title}</p>
                  </div>

                  <div className="space-y-6 p-6">
                    <div>
                      <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-muted)" }}>
                        BEFORE
                      </p>
                      <ul className="mt-3 space-y-3 text-base sm:text-lg">
                        {card.old.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "color-mix(in srgb, #ef4444 20%, transparent)", color: "#ef4444" }}>
                              x
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1" style={{ backgroundColor: "var(--app-border)" }} />
                      <span className="text-2xl font-bold" style={{ color: "var(--app-accent-strong)" }}>v</span>
                      <div className="h-px flex-1" style={{ backgroundColor: "var(--app-border)" }} />
                    </div>

                    <div>
                      <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-accent-strong)" }}>
                        WITH LERNA
                      </p>
                      <ul className="mt-3 space-y-3 text-base sm:text-lg">
                        {card.newWay.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "color-mix(in srgb, #22c55e 20%, transparent)", color: "#16a34a" }}>
                              v
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <PricingSection compact />

        <div
          className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-3 py-10 sm:px-6 sm:py-14"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold md:text-5xl">Frequently Asked Questions</h2>

            <div className="mt-10 space-y-4">
              {[
                {
                  q: "What does Lerna create from my study material?",
                  a: "Lerna can turn your uploads into study guides, short summaries, flashcards, quiz questions, and clearer explanations based on your own notes.",
                },
                {
                  q: "Which file types can I upload?",
                  a: "You can currently use pasted text, PDF and document files, audio recordings, and YouTube links. Support for more formats can be added as we expand the upload pipeline.",
                },
                {
                  q: "How much can I use for free?",
                  a: "The free tier is meant to help you get started quickly. Limits can vary by feature, and usage details are shown in-app as you study.",
                },
                {
                  q: "Can I export flashcards or notes?",
                  a: "Export options are being expanded. Right now, your generated study content is saved in your workspace, and dedicated export formats are planned next.",
                },
                {
                  q: "Does it handle long lectures and dense PDFs?",
                  a: "Yes. Lerna is designed to process long material by breaking it into manageable chunks, then generating focused outputs you can review faster.",
                },
                {
                  q: "Will my saved topics stay available later?",
                  a: "Yes. Topics are stored to your account so you can come back, rename them, and continue studying from your previous progress.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border p-0"
                  style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
                >
                  <summary className="cursor-pointer list-none px-4 py-4 text-lg font-semibold marker:content-none sm:px-6 sm:py-5 sm:text-2xl">
                    <div className="flex items-center justify-between gap-4">
                      <span>{item.q}</span>
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center transition-all duration-300 ease-out group-open:rotate-180 group-open:translate-y-0.5"
                        style={{ color: "var(--app-muted)" }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </summary>
                  <div className="px-4 pb-5 pt-1 text-sm leading-relaxed sm:px-6 sm:pb-6 sm:text-lg" style={{ color: "var(--app-muted)" }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <footer
          className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 border-t px-3 py-10 sm:px-6 sm:py-14"
          style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
              <div className="xl:col-span-1">
                <p className="text-xl font-extrabold tracking-[0.2em] sm:text-2xl">LERNA AI</p>
                <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--app-muted)" }}>
                  Study tools built to help students understand faster, remember longer, and perform better in class.
                </p>
                <div className="mt-5 flex gap-3 text-sm font-semibold">
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>Instagram</a>
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>LinkedIn</a>
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>X</a>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold sm:text-xl">Core Features</p>
                <div className="mt-4 space-y-2 text-base sm:text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>Study Guides</p>
                  <p>Flashcards</p>
                  <p>Quiz Practice</p>
                  <p>Deep Explanations</p>
                  <p>Progress Tracking</p>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold sm:text-xl">Study Tools</p>
                <div className="mt-4 space-y-2 text-base sm:text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>PDF to Notes</p>
                  <p>Lecture Audio to Summary</p>
                  <p>YouTube to Flashcards</p>
                  <p>Question Generator</p>
                  <p>Assignment Breakdown</p>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold sm:text-xl">Company</p>
                <div className="mt-4 space-y-2 text-base sm:text-lg">
                  <Link href="/pricing" style={{ color: "var(--app-muted)" }}>Pricing</Link>
                  <p><Link href="/support" style={{ color: "var(--app-muted)" }}>Support</Link></p>
                  <p><Link href="/auth?mode=signup" style={{ color: "var(--app-muted)" }}>Create Account</Link></p>
                  <p><Link href="/auth?mode=login" style={{ color: "var(--app-muted)" }}>Sign In</Link></p>
                  <p><Link href="/studyroom" style={{ color: "var(--app-muted)" }}>Open Studyroom</Link></p>
                </div>
              </div>

              <div>
                <p className="text-lg font-bold sm:text-xl">Legal</p>
                <div className="mt-4 space-y-2 text-base sm:text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>Privacy Policy</p>
                  <p>Terms of Use</p>
                  <p>Billing Policy</p>
                  <p>Data & Security</p>
                  <p>contact@lerna.ai</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 text-base" style={{ borderColor: "var(--app-border)", color: "var(--app-muted)" }}>
              <p>(c) 2026 Lerna AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}



