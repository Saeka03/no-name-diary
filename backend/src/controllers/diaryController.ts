import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from "express";

export const getDiary = async (_: Request, res: Response) => {
  try {
    const diary = await prisma.diary.findMany();
    res.status(200).json({ diary });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
