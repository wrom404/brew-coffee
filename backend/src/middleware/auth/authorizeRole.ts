import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { PayloadProps } from "../../types/jwt";

function authorizeRole(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return;
  }

  console.log("req id: ", req.userId)
  console.log("req role: ", req.role)

  try {
    const decoded = Jwt.verify(token, JWT_SECRET as string) as PayloadProps;

    if (!decoded || !decoded.role) {
      res.status(403).json({ success: false, message: "Invalid token payload." });
      return;
    }

    if (decoded.role !== 'admin') {
      res.status(403).json({ success: false, message: "Forbidden - Insufficient role." });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token." });
    return;
  }
}

export default authorizeRole