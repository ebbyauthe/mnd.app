"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type ExplainResponse = {
  explanation: string;
};

const MAX_CHARS = 12000;

export default function UploadPage() {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState("");

  const remainingChars = useMemo(() => MAX_CHARS - notes.length, [notes.length]);

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      setError("Only .txt files are supported in this first version. You can also paste notes below.");
      return;
    }

    const text = await file.text();
    setNotes(text.slice(0, MAX_CHARS));
    setError(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setExplanation("");

    if (!notes.trim()) {
      setError("Please paste notes or upload a text file first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      const payload = (await response.json()) as ExplainResponse & { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Something went wrong while generating the explanation.");
        return;
      }

      setExplanation(payload.explanation);
    } catch {
      setError("Unable to reach the explanation service.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-56px)] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest" style={{ color: "var(--app-muted)" }}>
              Upload Notes
            </p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Simple Explanation</h1>
            <p className="mt-3" style={{ color: "var(--app-muted)" }}>
              Paste class notes or upload a text file, then get a beginner-friendly explanation.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border px-4 py-2 text-sm"
            style={{ borderColor: "var(--app-border)" }}
          >
            Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-2xl border p-6"
          style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
        >
          <label className="block text-sm font-medium" style={{ color: "var(--app-muted)" }} htmlFor="fileUpload">
            Upload `.txt` notes
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".txt,text/plain"
            onChange={onFileChange}
            className="block w-full cursor-pointer rounded-lg border px-3 py-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            style={{
              borderColor: "var(--app-border)",
              backgroundColor: "var(--app-bg)",
              color: "var(--app-muted)",
            }}
          />

          <label className="block text-sm font-medium" style={{ color: "var(--app-muted)" }} htmlFor="notes">
            Or paste notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value.slice(0, MAX_CHARS))}
            placeholder="Paste lecture notes here..."
            className="h-72 w-full rounded-xl border p-4 text-sm outline-none focus:ring-2"
            style={{
              borderColor: "var(--app-border)",
              backgroundColor: "var(--app-bg)",
              color: "var(--app-fg)",
            }}
          />

          <div className="flex items-center justify-between text-sm" style={{ color: "var(--app-muted)" }}>
            <p>Character limit: {MAX_CHARS.toLocaleString()}</p>
            <p>{Math.max(remainingChars, 0).toLocaleString()} remaining</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
            style={{ backgroundColor: "var(--app-accent-strong)" }}
          >
            {isLoading ? "Explaining..." : "Explain My Notes"}
          </button>
        </form>

        {error ? (
          <div
            className="mt-6 rounded-xl border p-4"
            style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
          >
            {error}
          </div>
        ) : null}

        {explanation ? (
          <section
            className="mt-6 rounded-2xl border p-6"
            style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-card)" }}
          >
            <h2 className="text-2xl font-semibold">AI Explanation</h2>
            <p className="mt-3 whitespace-pre-wrap" style={{ color: "var(--app-muted)" }}>
              {explanation}
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
