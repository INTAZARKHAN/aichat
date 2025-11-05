// src/components/MessageBubble.tsx
import React from "react";

export default function MessageBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`${isUser ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"} p-3 rounded-md max-w-[75%]`}>
        <div className="text-sm whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}
