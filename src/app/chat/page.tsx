// src/app/chat/page.tsx
"use client";
import React, { useState } from "react";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <ChatWindow />
    </div>
  );
}
