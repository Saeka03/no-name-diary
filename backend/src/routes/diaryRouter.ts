import express from "express";
import { getDiary } from "../controllers/diaryController";

export const diaryRouter = express.Router();

// http://localhost:4000/diary

diaryRouter.get("/", getDiary);