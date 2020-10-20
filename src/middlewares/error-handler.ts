import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error(error);
  if (error instanceof HttpError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === 'QueryFailedError') {
    return response
      .status(400)
      .json({ message: error.message.replace(/ ".*"/, '') });
  }

  if (
    error.name === 'EntityNotFound' &&
    error.message.match(
      /Could not find any entity of type "Subreddit" matching/,
    )
  ) {
    return response.status(404).json({ message: 'Subreddit not found' });
  }

  if (
    error.name === 'EntityNotFound' &&
    error.message.match(/Could not find any entity of type "Post" matching/)
  ) {
    return response.status(404).json({ message: 'Post not found' });
  }

  return response.status(400).json({ message: 'Something went wrong.' });
};
