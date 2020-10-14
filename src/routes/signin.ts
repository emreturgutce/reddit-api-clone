import { Request, Response, NextFunction, Router } from 'express';
import { passportLogin } from '../middlewares/passport-login';

const router = Router();

router.get('/login', passportLogin, (request: Request, response: Response) => {
  response.json({
    message: 'Logged in',
    user: request.user,
  });
});

export { router as loginRouter };
