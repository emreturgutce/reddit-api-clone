import { Request, Response, NextFunction, Router } from 'express';
import { passportJwt } from '../middlewares/passport-jwt';

const router = Router();

router.get('/', passportJwt, (request: Request, response: Response) => {
  response.json({
    message: 'Authenticated 😸',
    user: request.user,
  });
});

export { router as indexRouter };
