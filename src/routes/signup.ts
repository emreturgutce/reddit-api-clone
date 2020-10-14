import { Request, Response, NextFunction, Router } from 'express';
import { passportSignup } from '../middlewares/passport-signup';

const router = Router();

router.get(
  '/signup',
  passportSignup,
  (request: Request, response: Response) => {
    response.status(201).json({
      message: 'User created',
      user: request.user,
    });
  }
);

export { router as signUpRouter };
