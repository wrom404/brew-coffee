import { Request, Response } from "express";
import { users } from "../../db/schema";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import hashPassword from "../../utils/hashPassword";
import validatePassword from "../../utils/validatePassword";
import generateToken from "../../utils/generateToken";
import validateRequiredFields from "../../utils/validateRequiredFields";
import handleEmptyResult from "../../utils/handleEmptyResult";

// Latest task: Continue using the reusable function validateRequiredFields, isNotANumber and handleEmptyResult
export async function signupUser(req: Request, res: Response) {
  const { name, email, password } = req.body

  if (validateRequiredFields(res, [name, email, password])) return; // Stop execution if required fields are empty

  try {
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (isUserExist.length !== 0) {
      res.status(400).json({ success: false, message: "Email already exist." })
      return;
    }

    const hashedPassword: string = await hashPassword(password);
    const result = await db.insert(users).values({ name, email, password: hashedPassword }).returning();

    if (handleEmptyResult(result, res, "Failed to signup user.")) return;

    res.status(201).json({ success: true, newUser: result, message: "User created successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

export async function signInUser(req: Request, res: Response) {
  const { email, password } = req.body

  if (validateRequiredFields(res, [email, password])) return;

  try {
    const isUserExist = await db.select().from(users).where(eq(users.email, email));

    if (handleEmptyResult(isUserExist, res, "Email not found.", 200)) return;

    const fetchedUser = isUserExist[0];

    const isPasswordValid = await validatePassword(password, fetchedUser.password);
    if (!isPasswordValid) {
      res.status(200).json({ success: false, message: "Password is incorrect." })
      return;
    }

    generateToken(fetchedUser.id, fetchedUser.role as string, res)

    res.status(201).json({ success: true, message: "Sign in successfully." })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Sign out successfully." })
}