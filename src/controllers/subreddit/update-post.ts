import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const updatePostRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
    select: ['id', 'name'],
  });

  const post = await getRepository(Post).findOneOrFail({
    where: { id: request.params.postId },
    relations: ['subreddit', 'user'],
    select: ['id', 'title', 'body', 'subreddit', 'user'],
  });

  if (post.subreddit.id !== subreddit.id) {
    throw new createHttpError.BadRequest('Post must be in the same subreddit');
  }

  if (post.user.id !== user.id) {
    throw new createHttpError.BadRequest(
      'User must be the owner of the subreddit',
    );
  }

  const { title, body } = request.body;

  if (!title && !body) {
    throw new createHttpError.BadRequest('Title or body must be specified.');
  }

  if (title) {
    post.title = title;
  }

  if (body) {
    post.body = body;
  }

  await connection.get().manager.save(post);

  response.status(200).json({
    message: `Updated ${subreddit.name} subreddit !`,
  });
};
