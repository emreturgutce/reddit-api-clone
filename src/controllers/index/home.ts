import { Request, Response } from 'express';

export const homeRouteHandler = (request: Request, response: Response) => {
  response.json({
    message: 'Authenticated 😸',
    user: request.user,
  });
};
