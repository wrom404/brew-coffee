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

  const parseId = Number(customerId);
  if (isNotANumber(parseId, res)) return;

  try {
    // typeof table.$inferSelect  → type of data returned when selecting from the table
    let result: typeof users.$inferSelect[] = await db.transaction(async (tx) => {
      return await tx.delete(users).where(eq(users.id, parseId)).returning();
    });

    if (result.length === 0) {
      res.status(404).json({ success: false, message: "No user found." });
      return;
    }

    res.status(200).json({
      success: true,
      deletedUser: result,
      message: "User deleted successfully.",
    });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
    return;
  }
}



// admin controller for managing customer account (e.g. Get all customers, delete customer...)