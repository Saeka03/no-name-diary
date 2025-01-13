import { Request, Response, NextFunction } from "express";

export type RequestWithId = Request & { id: number };

export function parseId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID provided." });
    return;
  }
  (req as RequestWithId).id = id;
  next();
}
