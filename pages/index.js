// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  questions;
  quizSessions;
  questionId;
  sessionId;
  constructor() {
    this.questions = /* @__PURE__ */ new Map();
    this.quizSessions = /* @__PURE__ */ new Map();
    this.questionId = 1;
    this.sessionId = 1;
    this.initializeQuestions();
  }
  initializeQuestions() {
    const questionData = [
      {
        text: "HTML\uC5D0\uC11C \\n\uC758 \uC758\uBBF8\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?",
        options: ["\uC904\uBC14\uAFC8\uC744 \uC758\uBBF8\uD569\uB2C8\uB2E4", "\uC0C8\uB85C\uC6B4 \uB2E8\uB77D\uC744 \uC758\uBBF8\uD569\uB2C8\uB2E4", "\uC774\uB984\uC744 \uC758\uBBF8\uD569\uB2C8\uB2E4"],
        correctAnswer: 0,
        explanation: "HTML\uC5D0\uC11C \\n\uC740 \uC904\uBC14\uAFC8(\uC0C8 \uC904)\uC744 \uC758\uBBF8\uD558\uB294 \uC774\uC2A4\uCF00\uC774\uD504 \uBB38\uC790\uC785\uB2C8\uB2E4. \uD14D\uC2A4\uD2B8\uC5D0\uC11C \uB2E4\uC74C \uC904\uB85C \uC774\uB3D9\uD560 \uB54C \uC0AC\uC6A9\uB429\uB2C8\uB2E4.",
        category: "HTML"
      },
      {
        text: "\uC6F9 \uD398\uC774\uC9C0\uC5D0\uC11C 'hover'\uB294 \uC5B4\uB5A4 \uC0C1\uD0DC\uB97C \uC758\uBBF8\uD558\uB098\uC694?",
        options: ["\uD074\uB9AD\uB41C \uC0C1\uD0DC", "\uB9C8\uC6B0\uC2A4\uAC00 \uC62C\uB77C\uAC04 \uC0C1\uD0DC", "\uC120\uD0DD\uB41C \uC0C1\uD0DC"],
        correctAnswer: 1,
        explanation: "hover\uB294 \uB9C8\uC6B0\uC2A4 \uCEE4\uC11C\uAC00 \uD2B9\uC815 \uC694\uC18C \uC704\uC5D0 \uC62C\uB77C\uAC04 \uC0C1\uD0DC\uB97C \uC758\uBBF8\uD569\uB2C8\uB2E4. CSS\uC5D0\uC11C :hover \uC120\uD0DD\uC790\uB85C \uC774 \uC0C1\uD0DC\uB97C \uC2A4\uD0C0\uC77C\uB9C1\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
        category: "CSS"
      },
      {
        text: "\uBE0C\uB77C\uC6B0\uC800 \uD0ED\uC5D0 \uD45C\uC2DC\uB418\uB294 \uC791\uC740 \uC544\uC774\uCF58\uC778 'Favicon'\uC740 \uBB34\uC5C7\uC778\uAC00\uC694?",
        options: ["\uC6F9\uC0AC\uC774\uD2B8\uC758 \uB300\uD45C \uC544\uC774\uCF58", "\uC990\uACA8\uCC3E\uAE30 \uBC84\uD2BC", "\uC0C8\uB85C\uACE0\uCE68 \uC544\uC774\uCF58"],
        correctAnswer: 0,
        explanation: "Favicon\uC740 \uC6F9\uC0AC\uC774\uD2B8\uB97C \uB300\uD45C\uD558\uB294 \uC791\uC740 \uC544\uC774\uCF58\uC73C\uB85C, \uBE0C\uB77C\uC6B0\uC800 \uD0ED\uC774\uB098 \uC990\uACA8\uCC3E\uAE30 \uBAA9\uB85D\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
        category: "HTML"
      },
      {
        text: "CSS\uC5D0\uC11C margin\uACFC padding\uC758 \uCC28\uC774\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?",
        options: ["margin\uC740 \uB0B4\uBD80 \uC5EC\uBC31, padding\uC740 \uC678\uBD80 \uC5EC\uBC31", "margin\uC740 \uC678\uBD80 \uC5EC\uBC31, padding\uC740 \uB0B4\uBD80 \uC5EC\uBC31", "\uB458 \uB2E4 \uAC19\uC740 \uC758\uBBF8"],
        correctAnswer: 1,
        explanation: "margin\uC740 \uC694\uC18C\uC758 \uC678\uBD80 \uC5EC\uBC31(\uC694\uC18C\uC640 \uB2E4\uB978 \uC694\uC18C \uC0AC\uC774\uC758 \uAC04\uACA9)\uC774\uACE0, padding\uC740 \uC694\uC18C\uC758 \uB0B4\uBD80 \uC5EC\uBC31(\uC694\uC18C\uC758 \uB0B4\uC6A9\uACFC \uD14C\uB450\uB9AC \uC0AC\uC774\uC758 \uAC04\uACA9)\uC785\uB2C8\uB2E4.",
        category: "CSS"
      },
      {
        text: "JavaScript\uC5D0\uC11C alert() \uD568\uC218\uB294 \uC5B4\uB5A4 \uC5ED\uD560\uC744 \uD558\uB098\uC694?",
        options: ["\uACBD\uACE0 \uBA54\uC2DC\uC9C0\uB97C \uD45C\uC2DC\uD569\uB2C8\uB2E4", "\uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD569\uB2C8\uB2E4", "\uCF58\uC194\uC5D0 \uBA54\uC2DC\uC9C0\uB97C \uCD9C\uB825\uD569\uB2C8\uB2E4"],
        correctAnswer: 0,
        explanation: "alert() \uD568\uC218\uB294 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uACBD\uACE0 \uB300\uD654\uC0C1\uC790\uB97C \uD45C\uC2DC\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uBA54\uC2DC\uC9C0\uB97C \uC804\uB2EC\uD569\uB2C8\uB2E4.",
        category: "JavaScript"
      },
      {
        text: "\uC6F9 \uAC1C\uBC1C\uC5D0\uC11C '\uD074\uB77C\uC774\uC5B8\uD2B8'\uC640 '\uC11C\uBC84'\uB294 \uAC01\uAC01 \uC5B4\uB5A4 \uC5ED\uD560\uC744 \uD558\uB098\uC694?",
        options: ["\uD074\uB77C\uC774\uC5B8\uD2B8\uB294 \uC11C\uBE44\uC2A4\uB97C \uC81C\uACF5\uD558\uACE0, \uC11C\uBC84\uB294 \uC694\uCCAD\uC744 \uD569\uB2C8\uB2E4", "\uD074\uB77C\uC774\uC5B8\uD2B8\uB294 \uC694\uCCAD\uC744 \uD558\uACE0, \uC11C\uBC84\uB294 \uC11C\uBE44\uC2A4\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4", "\uB458 \uB2E4 \uAC19\uC740 \uC5ED\uD560\uC744 \uD569\uB2C8\uB2E4"],
        correctAnswer: 1,
        explanation: "\uD074\uB77C\uC774\uC5B8\uD2B8\uB294 \uC11C\uBE44\uC2A4\uB97C \uC694\uCCAD\uD558\uB294 \uCABD(\uBE0C\uB77C\uC6B0\uC800, \uC571 \uB4F1)\uC774\uACE0, \uC11C\uBC84\uB294 \uC694\uCCAD\uC744 \uBC1B\uC544 \uC11C\uBE44\uC2A4\uB97C \uC81C\uACF5\uD558\uB294 \uCABD\uC785\uB2C8\uB2E4.",
        category: "Web Development"
      },
      {
        text: "div \uD0DC\uADF8\uB294 \uC5B4\uB5A4 \uC6A9\uB3C4\uB85C \uC0AC\uC6A9\uB418\uB098\uC694?",
        options: ["\uC774\uBBF8\uC9C0\uB97C \uC0BD\uC785\uD560 \uB54C", "\uC601\uC5ED\uC744 \uB098\uB204\uAC70\uB098 \uADF8\uB8F9\uD654\uD560 \uB54C", "\uB9C1\uD06C\uB97C \uB9CC\uB4E4 \uB54C"],
        correctAnswer: 1,
        explanation: "div \uD0DC\uADF8\uB294 HTML\uC5D0\uC11C \uC601\uC5ED\uC744 \uB098\uB204\uAC70\uB098 \uC694\uC18C\uB4E4\uC744 \uADF8\uB8F9\uD654\uD558\uB294 \uCEE8\uD14C\uC774\uB108 \uC5ED\uD560\uC744 \uD569\uB2C8\uB2E4.",
        category: "HTML"
      },
      {
        text: "HTML \uBB38\uC11C\uC5D0\uC11C <head>\uC640 <body>\uC758 \uCC28\uC774\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?",
        options: ["head\uB294 \uD654\uBA74\uC5D0 \uD45C\uC2DC\uB418\uB294 \uB0B4\uC6A9, body\uB294 \uBA54\uD0C0 \uC815\uBCF4", "head\uB294 \uBA54\uD0C0 \uC815\uBCF4, body\uB294 \uD654\uBA74\uC5D0 \uD45C\uC2DC\uB418\uB294 \uB0B4\uC6A9", "\uB458 \uB2E4 \uAC19\uC740 \uC5ED\uD560"],
        correctAnswer: 1,
        explanation: "<head>\uB294 \uBB38\uC11C\uC758 \uBA54\uD0C0 \uC815\uBCF4(\uC81C\uBAA9, \uC2A4\uD0C0\uC77C, \uC2A4\uD06C\uB9BD\uD2B8 \uB4F1)\uB97C \uD3EC\uD568\uD558\uACE0, <body>\uB294 \uC2E4\uC81C\uB85C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uB418\uB294 \uB0B4\uC6A9\uC744 \uD3EC\uD568\uD569\uB2C8\uB2E4.",
        category: "HTML"
      },
      {
        text: "console.log()\uB294 \uC5B8\uC81C \uC0AC\uC6A9\uD558\uB098\uC694?",
        options: ["\uC0AC\uC6A9\uC790\uC5D0\uAC8C \uBA54\uC2DC\uC9C0\uB97C \uD45C\uC2DC\uD560 \uB54C", "\uB514\uBC84\uAE45\uC744 \uC704\uD574 \uCF58\uC194\uC5D0 \uC815\uBCF4\uB97C \uCD9C\uB825\uD560 \uB54C", "\uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD560 \uB54C"],
        correctAnswer: 1,
        explanation: "console.log()\uB294 \uAC1C\uBC1C\uC790\uAC00 \uB514\uBC84\uAE45\uC744 \uC704\uD574 \uBE0C\uB77C\uC6B0\uC800\uC758 \uAC1C\uBC1C\uC790 \uB3C4\uAD6C \uCF58\uC194\uC5D0 \uC815\uBCF4\uB97C \uCD9C\uB825\uD558\uB294 \uD568\uC218\uC785\uB2C8\uB2E4.",
        category: "JavaScript"
      },
      {
        text: "\uC6F9 \uD398\uC774\uC9C0\uC5D0\uC11C \uB9C1\uD06C\uB97C \uAC78 \uB54C \uC0AC\uC6A9\uD558\uB294 \uD0DC\uADF8\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?",
        options: ["<link> \uD0DC\uADF8", "<a> \uD0DC\uADF8", "<url> \uD0DC\uADF8"],
        correctAnswer: 1,
        explanation: "<a> \uD0DC\uADF8\uB294 anchor\uC758 \uC904\uC784\uB9D0\uB85C, \uC6F9 \uD398\uC774\uC9C0\uC5D0\uC11C \uB2E4\uB978 \uD398\uC774\uC9C0\uB098 \uC704\uCE58\uB85C \uC774\uB3D9\uD558\uB294 \uB9C1\uD06C\uB97C \uB9CC\uB4E4 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        category: "HTML"
      }
    ];
    questionData.forEach((data) => {
      const question = {
        id: this.questionId++,
        ...data
      };
      this.questions.set(question.id, question);
    });
  }
  async getQuestions() {
    return Array.from(this.questions.values());
  }
  async getQuestion(id) {
    return this.questions.get(id);
  }
  async createQuizSession(session) {
    const id = this.sessionId++;
    const newSession = { ...session, id, completed: session.completed || false };
    this.quizSessions.set(id, newSession);
    return newSession;
  }
  async updateQuizSession(id, session) {
    const existing = this.quizSessions.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...session };
    this.quizSessions.set(id, updated);
    return updated;
  }
  async getQuizSession(id) {
    return this.quizSessions.get(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  category: text("category").notNull()
});
var quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  userAnswers: text("user_answers").array().notNull(),
  completed: boolean("completed").default(false)
});
var insertQuestionSchema = createInsertSchema(questions).omit({
  id: true
});
var insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/questions", async (req, res) => {
    try {
      const questions2 = await storage.getQuestions();
      res.json(questions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });
  app2.get("/api/questions/:id", async (req, res) => {
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
  app2.post("/api/quiz/start", async (req, res) => {
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
  app2.post("/api/quiz/:id/submit", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const { score, userAnswers } = req.body;
      const updatedSession = await storage.updateQuizSession(sessionId, {
        score,
        userAnswers: userAnswers.map((answer) => JSON.stringify(answer)),
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
  app2.get("/api/quiz/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
