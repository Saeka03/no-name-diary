import express, { Request, Response } from "express";
import {
  deleteComment,
  getComments,
  postComment,
} from "../controllers/commentsController";
import { parseId, RequestWithId } from "../middlewares/parseId.middleware";

export const commentsRouter = express.Router();

// http://localhost:4000/comments

commentsRouter.get("/", getComments);
commentsRouter.post("/", postComment);
commentsRouter.delete("/:id", parseId, (req, res) => {
  deleteComment(req as RequestWithId, res);
});
