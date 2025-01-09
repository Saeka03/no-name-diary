import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from "express";
import { RequestWithId } from "../middlewares/parseId.middleware";

export const getComments = async (_: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { diary: true },
    });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const postComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { dateTime, content, diaryId } = req.body;
  if (!dateTime || !content || !diaryId) {
    res.status(400).json({ message: "Values are not found" });
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        dateTime,
        content,
        diaryId,
      },
    });
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const deleteComment = async (req: RequestWithId, res: Response) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: req.id },
    });
    res.status(200).json({ deletedComment });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
