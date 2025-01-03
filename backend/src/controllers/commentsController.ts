import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from "express";

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
