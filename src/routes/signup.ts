import { Request, Response, NextFunction, Router } from 'express';
import { passportSignup } from '../middlewares/passport-signup';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('username').notEmpty().withMessage('Username must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  passportSignup,
  (request: Request, response: Response) => {
    response.status(201).json({
      message: 'User created',
      user: request.user,
    });
  }
);

export { router as signUpRouter };
