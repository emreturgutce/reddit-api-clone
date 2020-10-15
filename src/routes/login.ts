import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { passportLogin } from '../middlewares/passport-login';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  passportLogin,
  (request: Request, response: Response) => {
    response.json({
      message: 'Logged in',
      user: request.user,
    });
  },
);

export { router as loginRouter };
