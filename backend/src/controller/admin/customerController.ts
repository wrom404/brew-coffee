import { Request, Response } from "express";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function getAllCustomer(req: Request, res: Response): Promise<void> {
  try {
    const queryUsers = await db.select().from(users);

    if (queryUsers.length === 0) {
      res.status(400).json({ success: false, message: "No users found" })
      return;
    }

    res.status(200).json({ success: true, users: queryUsers })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}