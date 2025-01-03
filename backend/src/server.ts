import express from "express";
import "dotenv/config";
import { diaryRouter } from "./routes/diaryRouter";
import { commentsRouter } from "./routes/commentsRouter";

export const server = express();

// Routes
server.use("/diary", diaryRouter);
server.use("/comments", commentsRouter);
