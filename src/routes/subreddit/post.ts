import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { passportJwt } from '../../middlewares/passport-jwt';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

const router = Router();

router.post(
  '/r/:subredditName',
  passportJwt,
  async (request: Request, response: Response) => {
    const { title, body } = request.body;

    const user = await getRepository(User).findOneOrFail(request.user!.id);
    const subreddit = await getRepository(Subreddit).findOneOrFail({
      where: { name: request.params.subredditName },
    });

    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = user;
    post.subreddit = subreddit;

    connection.get().manager.save(post);

    response.status(201).json({ post });
  },
);

export { router as postRouter };
