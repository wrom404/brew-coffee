import { Request, Response } from "express";
import { users } from "../../db/schema";
import { db } from "../../db";
import validateRequiredFields from "../../utils/validateRequiredFields";
import { eq } from "drizzle-orm";
import isNotANumber from "../../utils/isNotANumber";
import handleEmptyResult from "../../utils/handleEmptyResult";
import hashPassword from "../../utils/hashPassword";
import validatePassword from "../../utils/validatePassword";

export async function getUserProfile(req: Request, res: Response) {
  const { customerId } = req.params;

  if (validateRequiredFields(res, [customerId], "Invalid, customer id is null.")) return;

  const parsedId = Number(customerId)
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const result = await db.select().from(users).where(eq(users.id, parsedId));
    if (handleEmptyResult(result, res, "No user found.")) return;

    console.log("User: ", result);
    res.status(200).json({ success: true, user: result });
  } catch (error) {
    res.status(500).json({ success: false, error, message: "Internal server error." });
  }
}

export async function updateCustomerProfile(req: Request, res: Response) {
  const { customerId } = req.params;
  const { name, email, password } = req.body

  if (validateRequiredFields(res, [name, email, password, customerId])) return; // Stop execution if required fields are empty

  const parsedId = Number(customerId)
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const selectResult = await db.select().from(users).where(eq(users.id, parsedId));
    if (handleEmptyResult(selectResult, res, "No user found.")) return;

    const existingHashedPassword = selectResult[0].password;

    // Check if the new password is same as the existing one
    const isSamePassword = await validatePassword(password, existingHashedPassword);

    let passwordToSave = existingHashedPassword;
    if (!isSamePassword) {
      // If password is different, hash it
      passwordToSave = await hashPassword(password);
    }

    const result = await db.update(users).set({ name, email, password: passwordToSave }).where(eq(users.id, parsedId)).returning();

    res.status(200).json({ success: true, user: result[0], message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error, message: "Internal server error." });
  }
}