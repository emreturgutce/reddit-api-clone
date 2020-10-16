import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../config/database';
import { passportJwt } from '../middlewares/passport-jwt';
import { User } from '../models/user';

const router = Router();

router.get(
  '/logout',
  passportJwt,
  async (request: Request, response: Response) => {
    const user = await getRepository(User).findOne(request.user!.id);

    user!.deleteAuthToken();

    await connection.get().manager.save(user);

    request.session = null;
    request.logout();

    response.json({
      message: 'Logged out',
    });
  },
);

export { router as logoutRouter };
