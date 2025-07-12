import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all questions
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Get a specific question
  app.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const question = await storage.getQuestion(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  // Create a new quiz session
  app.post("/api/quiz/start", async (req, res) => {
    try {
      const sessionData = {
        score: 0,
        totalQuestions: 10,
        userAnswers: [],
        completed: false
      };
      
      const validatedData = insertQuizSessionSchema.parse(sessionData);
      const session = await storage.createQuizSession(validatedData);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create quiz session" });
    }
  });

  // Submit quiz results
  app.post("/api/quiz/:id/submit", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const { score, userAnswers } = req.body;
      
      const updatedSession = await storage.updateQuizSession(sessionId, {
        score,
        userAnswers: userAnswers.map((answer: any) => JSON.stringify(answer)),
        completed: true
      });
      
      if (!updatedSession) {
        return res.status(404).json({ message: "Quiz session not found" });
      }
      
      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit quiz results" });
    }
  });

  // Get quiz session results
  app.get("/api/quiz/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getQuizSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Quiz session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
