import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

function extractGeminiText(payload: unknown): string {
  if (
    payload &&
    typeof payload === "object" &&
    "candidates" in payload &&
    Array.isArray(payload.candidates)
  ) {
    for (const candidate of payload.candidates) {
      if (
        candidate &&
        typeof candidate === "object" &&
        "content" in candidate &&
        candidate.content &&
        typeof candidate.content === "object" &&
        "parts" in candidate.content &&
        Array.isArray(candidate.content.parts)
      ) {
        for (const content of candidate.content.parts) {
          if (
            content &&
            typeof content === "object" &&
            "text" in content &&
            typeof content.text === "string" &&
            content.text.trim()
          ) {
            return content.text.trim();
          }
        }
      }
    }
  }

  return "";
}

function extractTitleAndBody(text: string): { title: string; explanation: string } {
  const cleaned = text.trim();
  const lines = cleaned.split("\n");

  const firstNonEmpty = lines.find((line) => line.trim().length > 0) ?? "";
  if (firstNonEmpty.startsWith("# ")) {
    const title = firstNonEmpty.replace(/^#\s+/, "").trim() || "lerna.ai";
    const rest = lines
      .slice(lines.indexOf(firstNonEmpty) + 1)
      .join("\n")
      .trim();
    return { title, explanation: rest || cleaned };
  }

  return { title: "lerna.ai", explanation: cleaned };
}

export async function POST(request: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Server is missing GEMINI_API_KEY." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { notes?: string };
    const notes = body.notes?.trim() ?? "";

    if (!notes) {
      return NextResponse.json({ error: "Notes are required." }, { status: 400 });
    }

    const prompt = [
      "You are lerna.ai, an expert tutor for students.",
      "Goal: produce a high-quality, in-depth explanation that reads like clean study notes.",
      "Write in very clear language. Avoid jargon unless you define it.",
      "Return Markdown only. No code fences.",
      "Start with exactly one H1 title: '# <topic title>'.",
      "Then follow this exact structure:",
      "## What is <topic>?",
      "A clear paragraph definition.",
      "### Why It Matters",
      "3-6 bullet points with short explanations.",
      "## Core Ideas",
      "Explain each core idea in short paragraphs.",
      "## Major Types / Branches / Components",
      "For each major component, use this format:",
      "### <Component Name>",
      "- Focus: ...",
      "- Purpose: ...",
      "- Examples: ...",
      "- Typical outcomes/applications: ...",
      "Include at least 5 components when possible from the notes.",
      "## Detailed Examples",
      "Provide at least 8 concrete examples from simple to advanced.",
      "## Common Mistakes",
      "List at least 6 mistakes and how to fix each.",
      "## Quick Recap",
      "A compact summary in bullet points.",
      "## Self-Test",
      "Write 8 short-answer questions and provide concise answers.",
      "Quality bar: this should be broader and deeper than a typical summary.",
      "Target length: around 1200-1800 words when enough material is provided.",
      "",
      "NOTES:",
      notes,
    ].join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
      {
      method: "POST",
      headers: {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.45,
          maxOutputTokens: 3000,
        },
      }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Gemini request failed: ${errorText}` },
        { status: 502 },
      );
    }

    const payload = await response.json();
    const explanation = extractGeminiText(payload);

    if (!explanation) {
      return NextResponse.json(
        { error: "No explanation returned by AI service." },
        { status: 502 },
      );
    }

    const parsed = extractTitleAndBody(explanation);
    return NextResponse.json({
      title: parsed.title,
      explanation: parsed.explanation,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while generating explanation." },
      { status: 500 },
    );
  }
}
