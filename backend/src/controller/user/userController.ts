import { Request, Response } from "express";
import { cartItems, products, users } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import handleEmptyResult from "../../utils/handleEmptyResult";
import { PayloadProps } from "../../types/jwt";

export async function getCurrentUser(req: Request, res: Response) {
  const { token } = req.cookies;

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    console.log("sud sa user controller: ", token)
    if (!token) {
      res.status(200).json({ success: true, message: "Not sign in yet, please sign in." })
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as PayloadProps;

    if (handleEmptyResult([decoded], res)) return;

    const userId = decoded?.userId;

    if (handleEmptyResult([userId], res)) return;

    const [result] = await db.select().from(users).where(eq(users.id, userId));

    if (handleEmptyResult([result], res)) return;

    result.password = '';

    res.status(200).json({ success: true, currentUser: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error.", error })
  }
}