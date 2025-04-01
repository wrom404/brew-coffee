import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { PayloadProps } from '../../types/jwt';

function generateToken(userId: number, role: string, res: Response) {
  const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

  const payload: PayloadProps = { userId, role }

  const token = jwt.sign(payload, MY_SECRET_KEY!, {
    expiresIn: "7d",
  })

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  console.log(`Token: ${token}`);

  return token;
}

export default generateToken;