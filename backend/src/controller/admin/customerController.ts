import { Request, Response } from "express";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import validateRequiredFields from "../../utils/validateRequiredFields";
import handleEmptyResult from "../../utils/handleEmptyResult";
import isNotANumber from "../../utils/isNotANumber";

export async function getAllCustomer(req: Request, res: Response): Promise<void> {
  try {
    const result = await db.select().from(users);
    if (handleEmptyResult(result, res, "No users found.")) return;

    res.status(200).json({ success: true, users: result })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function deleteCustomer(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;
  if (validateRequiredFields(res, [customerId])) return;

  const parseId = Number(customerId)
  if (isNotANumber(parseId, res)) return;

  try {
    const result = await db.delete(users).where(eq(users.id, parseId)).returning();
    if (handleEmptyResult(result, res, "No user found.")) return;

    res.status(200).json({ success: true, deletedUser: result, message: "USer deleted successfully." })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}


// admin controller for managing customer account (e.g. Get all customers, delete customer...)