import { Request, Response, NextFunction } from 'express';
import { passport } from '../config/passport';

export const passportJwt = (
  request: Request,
  response: Response,
  next: NextFunction,
) => passport.authenticate('jwt', { session: false })(request, response, next);
