import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const joinSubredditRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
  });

  subreddit.users = [...(subreddit.users || []), user];

  await connection.get().manager.save(subreddit);

  response.status(200).json({
    message: `Now you have joined to ${subreddit.name} subreddit !`,
  });
};
