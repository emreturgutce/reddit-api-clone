import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Subreddit } from '../../models/subreddit';
import { redis } from '../../config/redis';
import { EXPIRATION_SECONDS, KEYS } from '../../constants';

export const getAllSubredditsRouteHandler = async (
  request: Request,
  response: Response,
) => {
  let subreddits: Subreddit[] | string[] = await redis.actions.smembers(
    KEYS.SUBREDDITS_SET,
  );

  if (subreddits.length === 0) {
    const srs = await getRepository(Subreddit).find({
      select: ['id', 'name', 'description'],
    });

    srs.forEach((s: Subreddit) => {
      redis.actions.sadd(
        KEYS.SUBREDDITS_SET,
        JSON.stringify({
          id: s.id,
          name: s.name,
          description: s.description,
        }),
      );
    });

    await redis.actions.expire(KEYS.SUBREDDITS_SET, EXPIRATION_SECONDS);

    subreddits = srs;
  } else {
    subreddits = subreddits.map((s) => JSON.parse(s));

    await redis.actions.expire(KEYS.SUBREDDITS_SET, EXPIRATION_SECONDS);
  }

  response.json({ subreddits });
};
