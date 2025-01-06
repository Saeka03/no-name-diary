import express from "express";
import cors from "cors";
import "dotenv/config";
import { diaryRouter } from "./routes/diaryRouter";
import { commentsRouter } from "./routes/commentsRouter";

export const server = express();
server.use(express.json());

// Set up allowed origin
const allowedOrigin = process.env.FRONTEND_ORIGIN || "";

// CORS Configuration
server.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);

// Routes
server.use("/diary", diaryRouter);
server.use("/comments", commentsRouter);
