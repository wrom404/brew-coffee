import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { PayloadProps } from "../../types/jwt";

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.header("Authorization")?.split(" ")[1];

  const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

  if (!token) {
    res.status(400).json({ success: false, message: "Unauthorized user." })
    return;
  }
  try {
    // jwt.verify(token, MY_SECRET_KEY!) returns a decoded token.
    // if decoded is successful, it typically returns the payload of the JWT. However, the TypeScript type definition for jwt.verify() might not be specific about the exact structure of this payload. It might a more general type like object or any.
    const decoded = jwt.verify(token, MY_SECRET_KEY!) as PayloadProps;

    //test this if what's inside of this decoded or what is the decoded token that returns in jwt.verify
    console.log("decoded: ", decoded)

    if (!decoded) {
      res.status(400).json({ success: false, message: "Invalid token." })
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error })
    return;
  }
}

export default authMiddleware;