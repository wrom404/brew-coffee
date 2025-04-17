import { Response } from "express";

function handleEmptyResult<T>(result: T[], res: Response, message: string = "Something went wrong."): boolean {
  if (result.length === 0) {
    res.status(400).json({ success: false, message });
    return true; // tell the caller to stop
  }
  return false;
}

export default handleEmptyResult;
