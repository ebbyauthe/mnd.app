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
    <main className="min-h-[calc(100vh-56px)] px-6 py-6 md:py-8">
      <section className="mx-auto max-w-7xl">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#020817] px-6 py-12 text-[#e6eeff] md:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1736] to-[#0a1025] shadow-[0_0_120px_rgba(23,69,194,0.35)]" />

              <div className="hero-float-a absolute left-[6%] top-[7%] w-56 rounded-2xl border border-violet-300/35 bg-[#181f45]/95 p-4 shadow-2xl">
                <p className="text-xs font-semibold text-violet-300">QUIZ - CHEMISTRY</p>
                <p className="mt-3 text-lg font-bold text-white">What is Avogadro&apos;s number?</p>
                <p className="mt-2 text-sm text-slate-300">6.022 x 10^23</p>
              </div>

              <div className="hero-float-b absolute left-[8%] top-[30%] w-[72%] rounded-2xl border border-white/10 bg-[#121936]/90 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">Welcome back</p>
                  <span className="rounded-full border border-violet-300/45 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
                    + Upload
                  </span>
                </div>
                <div className="mt-4 h-36 rounded-xl border border-white/10 bg-white/[0.02]" />
              </div>

              <div className="hero-float-c absolute right-[2%] top-[40%] w-64 rounded-2xl border border-violet-300/35 bg-[#1a2048]/95 p-4">
                <p className="text-xs font-semibold text-violet-300">FLASHCARD</p>
                <p className="mt-3 text-2xl font-bold text-white">Pythagorean Theorem</p>
                <p className="mt-2 text-sm text-slate-300">In right triangles: a^2 + b^2 = c^2.</p>
              </div>

              <div className="hero-float-a absolute bottom-[4%] left-[10%] w-60 rounded-2xl border border-cyan-300/35 bg-[#142043]/95 p-4">
                <p className="text-xs font-semibold text-emerald-300">NOTES</p>
                <p className="mt-2 text-xl font-bold text-white">Constitutional Law</p>
                <p className="mt-2 text-sm text-slate-300">The constitution limits government power and protects rights.</p>
              </div>
            </div>

            <div>
              <p className="inline-flex rounded-full border border-violet-300/30 px-4 py-1 text-xs font-semibold text-violet-200">
                TRUSTED BY STUDENTS
              </p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] md:text-7xl">
                Learn Smarter…
                <br />
                <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                  Not Harder.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-300">
                Turn notes and lectures into AI flashcards, study guides, and quiz practice. Focus on learning, not formatting.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                {["PDFS - IMAGES - AUDIO", "FLASHCARDS - NOTES - QUIZZES", "WEB"].map((chip) => (
                  <span key={chip} className="rounded-full border border-white/15 px-4 py-2">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studyroom" className="rounded-full bg-white px-8 py-3 font-bold text-[#0a1025]">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden bg-[#020817] px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-xl font-medium text-slate-200 md:text-3xl">
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

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-4xl font-bold md:text-5xl">Our Process</h2>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl p-6" style={{ backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <p className="text-3xl font-bold">Hey David, what are you studying today?</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Upload", icon: "↑" },
                        { label: "Paste", icon: "⛓" },
                        { label: "Record", icon: "●" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border p-3 text-sm font-semibold" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                          <span className="mr-2" style={{ color: "var(--app-accent-strong)" }}>{item.icon}</span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-3xl font-semibold leading-snug">
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
                <p className="mt-4 text-3xl font-semibold leading-snug">
                  <span style={{ color: "var(--app-accent-strong)" }}>Instant Flashcards:</span> Turn hours of study into minutes with AI generated flashcards.
                </p>
              </article>

              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl p-6" style={{ backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <div className="grid grid-cols-[120px_1fr] gap-3">
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
                <p className="mt-4 text-3xl font-semibold leading-snug">
                  <span style={{ color: "var(--app-accent-strong)" }}>Smart Paper Grading:</span> Get detailed feedback based on your rubric.
                </p>
              </article>

              <article>
                <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                  <div className="rounded-3xl border p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-bg)", color: "var(--app-fg)" }}>
                    <p className="text-3xl font-bold">Calculus &amp; Functions</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>63</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>Unlearned</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>2</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fcd34d" }}>Learning</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>6</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(59,130,246,0.15)", color: "#93c5fd" }}>Learned</span></p>
                      <p><span className="mr-2 rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-card)" }}>9</span> <span className="rounded-md px-2 py-1" style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#86efac" }}>Mastered</span></p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-3xl font-semibold leading-snug">
                  <span style={{ color: "var(--app-accent-strong)" }}>Track Your Progress:</span> Monitor your growth and master subjects faster.
                </p>
              </article>
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/dashboard"
                className="rounded-2xl px-12 py-4 text-4xl font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5"
                style={{ background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#020817] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-4xl font-bold text-slate-100 md:text-5xl">
              Trusted by 100k+ students
            </h2>

            <ReviewsCarousel testimonials={testimonials} />
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#020817] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-4xl font-bold md:text-5xl">
              Why Students Choose Lerna Over Old Study Habits
            </h2>
            <p className="mx-auto mt-5 max-w-4xl text-center text-xl" style={{ color: "var(--app-muted)" }}>
              Lerna helps you study with less stress and better results by turning your class material into focused,
              practical learning workflows.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <article className="overflow-hidden rounded-3xl border" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                <div className="border-b p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 85%, #2dd4bf 15%)" }}>
                  <p className="text-3xl font-bold">Smarter Memory Methods, Not Just Re-reading</p>
                </div>
                <div className="space-y-6 p-6">
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-muted)" }}>TRADITIONAL METHODS</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✕ Reading notes without active recall</li>
                      <li>✕ Reviewing the same pages repeatedly</li>
                      <li>✕ No feedback on weak areas</li>
                    </ul>
                  </div>
                  <div className="text-center text-4xl" style={{ color: "var(--app-accent-strong)" }}>↓</div>
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-accent-strong)" }}>LERNA AI</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✓ Retrieval practice built into each session</li>
                      <li>✓ Smart spaced-review reminders</li>
                      <li>✓ Instant insight on what to improve</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                <div className="border-b p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 85%, #f59e0b 15%)" }}>
                  <p className="text-3xl font-bold">Faster Prep with Personalized Study Paths</p>
                </div>
                <div className="space-y-6 p-6">
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-muted)" }}>TRADITIONAL METHODS</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✕ Long setup before real studying starts</li>
                      <li>✕ Generic resources for every student</li>
                      <li>✕ Hard to adjust as topics change</li>
                    </ul>
                  </div>
                  <div className="text-center text-4xl" style={{ color: "var(--app-accent-strong)" }}>↓</div>
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-accent-strong)" }}>LERNA AI</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✓ Notes turned into study sets in seconds</li>
                      <li>✓ Explanations matched to your level</li>
                      <li>✓ Study flow updates with your progress</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border" style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}>
                <div className="border-b p-6" style={{ borderColor: "var(--app-border)", backgroundColor: "color-mix(in srgb, var(--app-card) 85%, #a78bfa 15%)" }}>
                  <p className="text-3xl font-bold">One Platform, Better Value, Anytime Access</p>
                </div>
                <div className="space-y-6 p-6">
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-muted)" }}>TRADITIONAL METHODS</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✕ High tutoring and prep costs</li>
                      <li>✕ Several apps to manage at once</li>
                      <li>✕ Limited study help outside set hours</li>
                    </ul>
                  </div>
                  <div className="text-center text-4xl" style={{ color: "var(--app-accent-strong)" }}>↓</div>
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em]" style={{ color: "var(--app-accent-strong)" }}>LERNA AI</p>
                    <ul className="mt-3 space-y-2 text-lg">
                      <li>✓ Budget-friendly all-in-one toolkit</li>
                      <li>✓ Upload, review, quiz, and track in one place</li>
                      <li>✓ Study support whenever you need it</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <PricingSection compact />

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#020817] px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>

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
                  <summary className="cursor-pointer list-none px-6 py-5 text-2xl font-semibold marker:content-none">
                    <div className="flex items-center justify-between gap-4">
                      <span>{item.q}</span>
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-xl transition group-open:rotate-180"
                        style={{ borderColor: "var(--app-border)", color: "var(--app-muted)" }}
                      >
                        ˅
                      </span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-1 text-lg leading-relaxed" style={{ color: "var(--app-muted)" }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <footer className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 border-t px-6 py-14" style={{ borderColor: "var(--app-border)", backgroundColor: "#020817" }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
              <div className="xl:col-span-1">
                <p className="text-2xl font-extrabold tracking-[0.2em]">LERNA AI</p>
                <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--app-muted)" }}>
                  Study tools built to help students understand faster, remember longer, and perform better in class.
                </p>
                <div className="mt-5 flex gap-3 text-sm font-semibold">
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>Instagram</a>
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>LinkedIn</a>
                  <a href="#" className="rounded-full border px-3 py-1.5" style={{ borderColor: "var(--app-border)" }}>X</a>
                </div>
              </div>

              <div>
                <p className="text-xl font-bold">Core Features</p>
                <div className="mt-4 space-y-2 text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>Study Guides</p>
                  <p>Flashcards</p>
                  <p>Quiz Practice</p>
                  <p>Deep Explanations</p>
                  <p>Progress Tracking</p>
                </div>
              </div>

              <div>
                <p className="text-xl font-bold">Study Tools</p>
                <div className="mt-4 space-y-2 text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>PDF to Notes</p>
                  <p>Lecture Audio to Summary</p>
                  <p>YouTube to Flashcards</p>
                  <p>Question Generator</p>
                  <p>Assignment Breakdown</p>
                </div>
              </div>

              <div>
                <p className="text-xl font-bold">Company</p>
                <div className="mt-4 space-y-2 text-lg">
                  <Link href="/pricing" style={{ color: "var(--app-muted)" }}>Pricing</Link>
                  <p><Link href="/support" style={{ color: "var(--app-muted)" }}>Support</Link></p>
                  <p><Link href="/auth?mode=signup" style={{ color: "var(--app-muted)" }}>Create Account</Link></p>
                  <p><Link href="/auth?mode=login" style={{ color: "var(--app-muted)" }}>Sign In</Link></p>
                  <p><Link href="/studyroom" style={{ color: "var(--app-muted)" }}>Open Studyroom</Link></p>
                </div>
              </div>

              <div>
                <p className="text-xl font-bold">Legal</p>
                <div className="mt-4 space-y-2 text-lg" style={{ color: "var(--app-muted)" }}>
                  <p>Privacy Policy</p>
                  <p>Terms of Use</p>
                  <p>Billing Policy</p>
                  <p>Data & Security</p>
                  <p>contact@lerna.ai</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 text-base" style={{ borderColor: "var(--app-border)", color: "var(--app-muted)" }}>
              <p>© 2026 Lerna AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
