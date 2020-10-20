import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const deletePostRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
  });

  const post = await getRepository(Post).findOneOrFail({
    where: { id: request.params.postId },
    relations: ['subreddit', 'user'],
  });

  if (post.subreddit.id !== subreddit.id) {
    throw new createHttpError.BadRequest('Post must be in the same subreddit');
  }

  if (post.user.id !== user.id) {
    throw new createHttpError.BadRequest(
      'User must be the owner of the subreddit',
    );
  }

  subreddit.posts = [
    ...(subreddit.posts || []).filter((p: any) => p.id !== post.id),
  ];

  await connection.get().manager.save(subreddit);

  response.status(200).json({
    message: `Deleted ${subreddit.name} subreddit !`,
  });
};
