# mnd.app

AI-powered study platform built with Next.js App Router and Tailwind CSS.

Current first working flow:

1. Open `/upload`
2. Paste notes or upload a `.txt` file
3. Get a simple AI explanation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
OPENAI_API_KEY=your_api_key_here
# Optional:
# OPENAI_MODEL=gpt-4.1-mini
```

3. Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` Landing page
- `/dashboard` Feature dashboard
- `/upload` Upload notes and get explanation
- `/api/explain` API route that calls OpenAI
