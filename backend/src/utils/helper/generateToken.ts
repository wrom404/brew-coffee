import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { PayloadProps } from '../../types/jwt';

function generateToken(userId: number, role: string, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const payload: PayloadProps = { userId, role }

  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "1d",
  })

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: "strict",
  });

  console.log(`Token: ${token}`);

  return token;
}

export default generateToken;