// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

type Message = { role: "user" | "assistant"; content: string };

type Body = {
  message: string;
  history?: Message[];
};

const MOCK_MODE = process.env.MOCK_OPENAI === "true";
const OPENAI_KEY = process.env.OPENAI_API_KEY;
console.log("API Chat Route  AIzaSyCfDz8pB77Lti5qfNmK8BRtTQH9CDmA68I:", MOCK_MODE);
/**
 * Call OpenAI API
 */
async function callOpenAI(message: string, history: Message[]): Promise<string> {
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: "user", content: message },
  ];

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // change if needed
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`OpenAI error: ${resp.status} ${txt}`);
  }

  const data = await resp.json();
  const reply = data.choices?.[0]?.message?.content ?? "";
  return reply;
}

/**
 * Simple mock reply for dev/testing
 */
function mockReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! I'm a mock assistant. Ask me anything.";
  }
  if (lower.includes("time")) {
    return `Mock time: ${new Date().toLocaleString()}`;
  }
  return "This is a mock response (MOCK_OPENAI=false). Replace MOCK mode with a real API key to get real AI replies.";
}

/**
 * API POST handler
 */
export async function POST(request: Request) {
  try {
    const body: Body = await request.json();
    const { message, history = [] } = body ?? { message: "", history: [] };

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Use mock mode if enabled
    if (MOCK_MODE) {
      const reply = mockReply(message);
      return NextResponse.json({ reply });
    }

    // Check for API key
    if (!OPENAI_KEY) {
      return NextResponse.json(
        { error: "Missing server OPENAI_API_KEY. Or enable MOCK_OPENAI=true for no-key mode" },
        { status: 500 }
      );
    }

    // Call real OpenAI API
    const reply = await callOpenAI(message, history);
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("chat api error", err);
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
  }
}
