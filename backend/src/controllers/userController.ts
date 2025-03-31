import { Request, Response } from "express";
import { users } from "../db/schema";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import hashPassword from "../utils/helper/hashPassword";
import validatePassword from "../utils/helper/validatePassword";
import generateToken from "../utils/helper/generateToken";

export function getUser(req: Request, res: Response): any {
  return res.status(200).json({ success: true, message: "Success." })
}


export async function signupUser(req: Request, res: Response): Promise<any> {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Validation error." })
  }
  try {
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (isUserExist.length !== 0) {
      return res.status(400).json({ success: false, message: "Email already exist." })
    }

    const hashedPassword: string = await hashPassword(password);

    const newUser = await db.insert(users).values({ name, email, password: hashedPassword }).returning();

    if (newUser.length === 0) {
      return res.status(400).json({ success: false, message: "Insert query error." })
    }

    return res.status(201).json({ success: true, user: newUser[0].password = '', message: "User created successfully" })
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
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (isUserExist.length === 0) {
      return res.status(400).json({ success: false, message: "Email not found." })
    }

    const fetchedUser = isUserExist[0];

    const isPasswordValid = await validatePassword(password, fetchedUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Password is incorrect." })
    }

    generateToken(fetchedUser.id, fetchedUser.role!, res)

    return res.status(201).json({ success: true, message: "Login successfully." })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}


export async function logoutUser(req: Request, res: Response): Promise<any> {
  console.log("Inside of logout function")
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logout successfully." })
}