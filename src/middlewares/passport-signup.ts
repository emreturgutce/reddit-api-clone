import { Request, Response, NextFunction } from 'express';
import { passport } from '../config/passport';

export const passportSignup = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate('signup', { session: false })(request, response, next);
};
