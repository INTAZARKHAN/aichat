// src/components/MessageInput.tsx
"use client";
import React, { useState } from "react";

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="mt-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded border"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
    </form>
  );
}
