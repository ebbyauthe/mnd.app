import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

function extractOutputText(payload: unknown): string {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string" &&
    payload.output_text.trim()
  ) {
    return payload.output_text.trim();
  }

  if (
    payload &&
    typeof payload === "object" &&
    "output" in payload &&
    Array.isArray(payload.output)
  ) {
    for (const item of payload.output) {
      if (item && typeof item === "object" && "content" in item && Array.isArray(item.content)) {
        for (const content of item.content) {
          if (
            content &&
            typeof content === "object" &&
            "type" in content &&
            content.type === "output_text" &&
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

export async function POST(request: Request) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Server is missing OPENAI_API_KEY." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { notes?: string };
    const notes = body.notes?.trim() ?? "";

    if (!notes) {
      return NextResponse.json({ error: "Notes are required." }, { status: 400 });
    }

    const prompt = [
      "You are a helpful study tutor.",
      "Explain the notes in simple language for a student.",
      "Only use the provided notes. If a detail is missing, say it is not in the notes.",
      "Format with short headings and bullet points.",
      "",
      "NOTES:",
      notes,
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt,
        max_output_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `OpenAI request failed: ${errorText}` },
        { status: 502 },
      );
    }

    const payload = await response.json();
    const explanation = extractOutputText(payload);

    if (!explanation) {
      return NextResponse.json(
        { error: "No explanation returned by AI service." },
        { status: 502 },
      );
    }

    return NextResponse.json({ explanation });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while generating explanation." },
      { status: 500 },
    );
  }
}
