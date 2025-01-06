import express from "express";
import { getComments, postComment } from "../controllers/commentsController";

export const commentsRouter = express.Router();

// http://localhost:4000/comments

commentsRouter.get("/", getComments);
commentsRouter.post("/", postComment);
