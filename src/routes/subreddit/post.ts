import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { passportJwt } from '../../middlewares/passport-jwt';
import { validateRequest } from '../../middlewares/validate-request';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

const router = Router();

router.post(
  '/r/:subredditName',
  passportJwt,
  [
    body('title').notEmpty().withMessage('Title field must be provided'),
    body('body').notEmpty().withMessage('body field must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { title, body } = request.body;

    const user = await getRepository(User).findOneOrFail(request.user!.id, {
      relations: ['subreddits'],
    });
    const subreddit = await getRepository(Subreddit).findOneOrFail({
      where: { name: request.params.subredditName },
    });

    if (!user.subreddits?.includes(subreddit)) {
      throw new createHttpError.BadRequest(
        'You must join the subreddit that you want to send post to',
      );
    }

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
