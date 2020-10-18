import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const leaveSubredditRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
    relations: ['users'],
  });

  const userIndex = subreddit.users?.findIndex((u) => u.id === user.id);

  if (userIndex === -1) {
    throw new createHttpError.BadRequest(
      'User must be a member of the subreddit that he wants to leave',
    );
  }

  subreddit.users = (subreddit.users || []).map(
    (s) => s.id !== subreddit.id,
  ) as any;

  await connection.get().manager.save(subreddit);

  response.status(200).json({
    message: `Left ${subreddit.name} subreddit !`,
  });
};
