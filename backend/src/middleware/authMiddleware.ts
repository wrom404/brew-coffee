import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { PayloadProps } from "../types/auth";

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  const token = req.header("Authorization")?.split(" ")[1];

  const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized user." })
  }
  try {
    // jwt.verify(token, MY_SECRET_KEY!) returns a decoded token.
    // if decoded is successful, it typically returns the payload of the JWT. However, the TypeScript type definition for jwt.verify() might not be specific about the exact structure of this payload. It might return a more general type like object or any.
    const decoded = jwt.verify(token, MY_SECRET_KEY!) as PayloadProps;

    //test this if what's inside of this decoded or what is the decoded token that returns in jwt.verify
    console.log("decoded: ", decoded)

    if (!decoded) {
      return res.status(400).json({ success: false, message: "Invalid token." })
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
}

export default authMiddleware;