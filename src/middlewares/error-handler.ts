import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(400).json({ message: 'Something went wrong.' });
};
