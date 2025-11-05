// src/components/ChatWindow.tsx
"use client";
import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Welcome! Ask me anything." },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const newMsg: Msg = { role: "user", content: text };
    setMessages(prev => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();

      if (!res.ok) {
        const err = data?.error ?? "Unknown error";
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${err}` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `Request failed: ${err.message ?? err}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="h-[400px] overflow-y-auto mb-3">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.content} />
        ))}
        {loading && <div className="text-sm text-slate-500">Assistant is typing...</div>}
      </div>
      <MessageInput onSend={send} />
    </div>
  );
}
