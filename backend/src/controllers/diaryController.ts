import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from "express";

export const getDiary = async (_: Request, res: Response): Promise<void> => {
  try {
    const diary = await prisma.diary.findMany();
    res.status(200).json({ diary });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const postDiary = async (req: Request, res: Response): Promise<void> => {
  const { dateTime, title, content } = req.body;
  if (!dateTime || !title || !content) {
    res.status(400).json({ message: "Values are not found" });
  }
  try {
    const diary = await prisma.diary.create({
      data: {
        dateTime,
        title,
        content,
        like: 0,
        laugh: 0,
        cry: 0,
      },
    });
    res.status(200).json({ diary });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
