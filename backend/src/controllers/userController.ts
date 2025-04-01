import { Request, Response } from "express";
import { users } from "../db/schema";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import hashPassword from "../utils/helper/hashPassword";
import validatePassword from "../utils/helper/validatePassword";
import generateToken from "../utils/helper/generateToken";

export function getUser(req: Request, res: Response): any {
  res.status(200).json({ success: true, message: "Success." })
  return;
}


export async function signupUser(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: "Validation error." })
    return;
  }
  
  try {
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (isUserExist.length !== 0) {
      res.status(400).json({ success: false, message: "Email already exist." })
      return;
    }

    const hashedPassword: string = await hashPassword(password);

    const newUser = await db.insert(users).values({ name, email, password: hashedPassword }).returning();

    if (newUser.length === 0) {
      res.status(400).json({ success: false, message: "Insert query error." })
      return;
    }

    res.status(201).json({ success: true, user: newUser[0].password = '', message: "User created successfully" })
    return;
  } catch (error) {
    res.status(400).json({ success: false, error })
    return;
  }
}


export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Validation error." })
    return;
  }
  try {
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (isUserExist.length === 0) {
      res.status(400).json({ success: false, message: "Email not found." })
      return;
    }

    const fetchedUser = isUserExist[0];

    const isPasswordValid = await validatePassword(password, fetchedUser.password);

    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Password is incorrect." })
      return;
    }

    generateToken(fetchedUser.id, fetchedUser.role!, res)

    res.status(201).json({ success: true, message: "Login successfully." })
    return;
  } catch (error) {
    res.status(400).json({ success: false, error })
    return;
  }
}


export async function logoutUser(req: Request, res: Response): Promise<void> {
  console.log("Inside of logout function")
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successfully." })
  return;
}