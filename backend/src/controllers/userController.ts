import { Request, Response } from "express";
import { users } from "../db/schema";
import { db } from "../db/index";
import { eq } from "drizzle-orm";

export function getUser(req: Request, res: Response): any {
  return res.status(200).json({ success: true, message: "Success." })
}

export async function signupUser(req: Request, res: Response): Promise<any> {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Validation error." })
  }
  try {
    const newUser = await db.insert(users).values({ name, email, password }).returning();

    if (newUser.length === 0) {
      return res.status(400).json({ success: false, message: "Insert query error." })
    }

    return res.status(201).json({ success: true, user: newUser, message: "User created successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export async function loginUser(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Validation error." })
  }
  try {
    const newUser = await db.select().from(users).where(eq(users.email, email));

    if (newUser.length === 0) {
      return res.status(400).json({ success: false, message: "Insert query error." })
    }

    return res.status(201).json({ success: true, user: newUser, message: "User created successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}