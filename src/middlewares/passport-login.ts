import { Request, Response, NextFunction } from 'express';
import { passport } from '../config/passport';

export const passportLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate('login', { session: false })(request, response, next);
};
