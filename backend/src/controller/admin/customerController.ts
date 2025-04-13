import { Request, Response } from "express";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

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

export async function deleteCustomer(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;

  if (!customerId) {
    res.status(400).json({ success: false, message: "Customer Id is null." })
    return;
  }

  const parseId = Number(customerId)

  if (isNaN(parseId)) {
    res.status(400).json({ success: false, message: "Customer Id is not a number." })
  }

  try {
    const result = await db.delete(users).where(eq(users.id, parseId)).returning();

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "No user found" })
      return;
    }

    res.status(200).json({ success: true, deletedUser: result, message: "USer deleted successfully." })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}


// admin controller for managing customer account (e.g. Get all customers, delete customer...)