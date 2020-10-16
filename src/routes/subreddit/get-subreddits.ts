import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { passportJwt } from '../../middlewares/passport-jwt';
import { User } from '../../models/user';

const router = Router();

router.get('/r', passportJwt, async (request: Request, response: Response) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOne({
    where: { id: userId },
    relations: ['subreddits'],
  });

  return response.json({ user });
});

export { router as getSubredditsRouter };
