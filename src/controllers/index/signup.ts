import { Request, Response } from 'express';

export const signupRouteHandler = (request: Request, response: Response) => {
  response.status(201).json({
    message: 'User created',
    user: request.user,
  });
};
