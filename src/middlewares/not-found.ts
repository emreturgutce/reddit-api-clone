import { Request, Response, NextFunction } from 'express';
import { NotFound } from 'http-errors';

export const notFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  throw new NotFound('Route not found');
};
