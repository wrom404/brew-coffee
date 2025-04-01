import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { PayloadProps } from '../../types/jwt';

function generateToken(userId: number, role: string, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const payload: PayloadProps = { userId, role }

  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "1h",
  })

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
    sameSite: "strict",
  });

  console.log(`Token: ${token}`);

  return token;
}

export default generateToken;