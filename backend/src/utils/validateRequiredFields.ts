import { Response } from "express";

function validateRequiredFields(res: Response, fields: any[], message = "Invalid, please input all the required fields."): boolean {
  const hasEmpty = fields.some(field => !field);

  if (hasEmpty) {
    res.status(400).json({ success: false, message });
    return true; // Stop execution
  }

  return false; // Proceed
}

export default validateRequiredFields;
