import { Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response): void {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
  return;
}

export default errorHandler;