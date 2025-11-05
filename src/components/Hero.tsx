// src/components/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-3xl font-semibold">AI Chatbot</h2>
      <p className="mt-2 text-sm text-slate-600">
        Chat with an assistant. Use mock mode (no API key) for local dev or provide an OpenAI key server-side for real replies.
      </p>
    </section>
  );
}
