import { Response } from "express";

function isNotANumber(id: number, res: Response): boolean {
  if (isNaN(id)) {
    res.status(400).json({ success: false, message: "Id is not a number." });
    return true; // Indicate invalid
  }
  return false; // Valid number
}

export default isNotANumber;
