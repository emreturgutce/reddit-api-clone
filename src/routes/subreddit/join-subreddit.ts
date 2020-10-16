import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { passportJwt } from '../../middlewares/passport-jwt';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

const router = Router();

router.get(
  '/r/:subredditName/join',
  passportJwt,
  async (request: Request, response: Response) => {
    const userId = request.user!.id;

    const user = await getRepository(User).findOneOrFail(userId);

    const subreddit = await getRepository(Subreddit).findOneOrFail({
      where: { name: request.params.subredditName },
    });

    subreddit.users = [...(subreddit.users || []), user];

    await connection.get().manager.save(subreddit);

    return response.status(200).json({
      message: `Now you have joined to ${subreddit.name} subreddit !`,
    });
  },
);

export { router as joinSubredditRouter };
