import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';

export const subredditPostsRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
  });

  const posts = await getRepository(Post).findOneOrFail({
    where: { subreddit: subreddit.id },
  });

  response.json({ posts });
};
