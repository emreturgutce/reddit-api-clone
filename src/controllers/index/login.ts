import { Request, Response } from 'express';

export const loginRouteHandler = (request: Request, response: Response) => {
  response.json({
    message: 'Logged in',
    user: request.user,
  });
};
