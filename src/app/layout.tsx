// src/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "AI Chatbot",
  description: "AI Chat with mock or OpenAI backend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-start justify-center p-6">
          <div className="w-full max-w-3xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
