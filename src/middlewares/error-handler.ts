import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof HttpError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === 'QueryFailedError') {
    return response
      .status(400)
      .json({ message: error.message.replace(/ ".*"/, '') });
  }

  return response.status(500).json({ message: 'Something went wrong.' });
};
