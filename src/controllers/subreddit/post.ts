import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const postRouteHandler = async (
  request: Request,
  response: Response,
) => {
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
};
