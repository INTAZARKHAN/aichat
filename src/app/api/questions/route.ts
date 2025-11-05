import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/lib/questionModel";

export async function POST(req: Request) {
  try {
    const { userId, question } = await req.json();

    if (!userId || !question) {
      return NextResponse.json({ error: "Missing userId or question" }, { status: 400 });
    }

    await connectDB();
    const newQuestion = await Question.create({ userId, question });
    return NextResponse.json({ success: true, data: newQuestion });
  } catch (error: any) {
    console.error("POST /api/questions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: questions });
  } catch (error: any) {
    console.error("GET /api/questions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
