import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { redis } from '../../config/redis';
import { EXPIRATION_SECONDS, KEYS } from '../../constants';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

interface ISubreddit {
  id: string;
  name: string;
  description: string;
}

async function saveToRedis(subreddit: ISubreddit) {
  redis.actions.sadd(KEYS.SUBREDDITS_SET, JSON.stringify(subreddit));
  await redis.actions.expire(KEYS.SUBREDDITS_SET, EXPIRATION_SECONDS);
}

export const createNewSubredditRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;
  const { name, description } = request.body;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = new Subreddit();
  subreddit.name = name;
  subreddit.description = description;
  subreddit.createdBy = user;

  await connection.get().manager.save(subreddit);

  await saveToRedis({
    id: subreddit.id,
    name: subreddit.name,
    description: subreddit.description,
  });

  response.status(201).json({
    subreddit: {
      id: subreddit.id,
      name: subreddit.name,
      description: subreddit.description,
      createdBy: {
        id: subreddit.createdBy.id,
      },
    },
  });
};
