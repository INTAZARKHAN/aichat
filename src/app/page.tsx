// src/app/page.tsx
import React from "react";
import Hero from "@/components/Hero";
import Card from "@/components/card";
export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="mt-8 grid grid-cols-1 gap-4">
        <Card title="How it works">
          <p>
            This app supports MOCK mode (no key) and PRODUCTION mode (uses OPENAI_API_KEY on server).
            Set <code>MOCK_OPENAI=true</code> to avoid using any key during development.
          </p>
        </Card>
        <Card title="Start chatting">
          <a className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded" href="/chat">
            Open Chat
          </a>
        </Card>
      </div>
    </main>
  );
}
