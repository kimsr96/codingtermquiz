import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  category: text("category").notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  userAnswers: text("user_answers").array().notNull(),
  completed: boolean("completed").default(false),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  userAnswers: UserAnswer[];
}
