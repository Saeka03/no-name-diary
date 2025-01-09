import express from "express";
import {
  deleteDiary,
  getDiary,
  postDiary,
} from "../controllers/diaryController";
import { parseId, RequestWithId } from "../middlewares/parseId.middleware";

export const diaryRouter = express.Router();

// http://localhost:4000/diary

diaryRouter.get("/", getDiary);
diaryRouter.post("/", postDiary);
diaryRouter.delete("/:id", parseId, (req, res) =>
  deleteDiary(req as RequestWithId, res)
);
