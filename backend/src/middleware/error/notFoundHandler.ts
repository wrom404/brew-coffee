import { Response, Request } from "express";

function notFoundRoute(req: Request, res: Response): void {
  res.status(404).send({ message: 'Route not found' });
  return;
}

export default notFoundRoute