import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  userId: string;
  question: string;
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  userId: { type: String, required: true },
  question: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Question =
  mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);
