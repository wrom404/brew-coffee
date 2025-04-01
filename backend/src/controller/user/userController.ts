import { Request, Response } from "express";

export function getUser(req: Request, res: Response): void {
  res.status(200).json({ success: true, message: "Success." })
  return;
}