import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const deleteSubredditRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
    relations: ['createdBy'],
  });

  if (subreddit.createdBy.id !== user.id) {
    throw new createHttpError.BadRequest(
      'User must be owner of the subreddit that he wants to delete',
    );
  }

  await getRepository(Subreddit).remove(subreddit);

  response.status(200).json({
    message: `Now you have deleted ${subreddit.name} subreddit !`,
  });
};
