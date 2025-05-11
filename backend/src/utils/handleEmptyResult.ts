import { Response } from "express";

function handleEmptyResult<T>(result: T[], res: Response, message: string = "Something went wrong.", status: number = 400, isSuccess: boolean = false): boolean {
  if (result.length === 0) {
    res.status(status).json({ success: isSuccess, message });
    return true; // tell the caller to stop
  }
  return false;
}

export default handleEmptyResult;
