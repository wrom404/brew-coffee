import { Request, Response, NextFunction } from "express";
import colors from "colors"; // Ensure colors package is installed

export type MethodColorProps = {
  GET: (text: string) => string;
  POST: (text: string) => string;
  PUT: (text: string) => string;
  DELETE: (text: string) => string;
};

function logger(req: Request, res: Response, next: NextFunction) {
  const methodColor: MethodColorProps = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.red,
  };

  // Ensure req.method is typed correctly
  const colorFunction = methodColor[req.method as keyof MethodColorProps] || colors.white;

  console.log(colorFunction(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));

  next();
}

export default logger;
