import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Subreddit } from '../../models/subreddit';
import { redis } from '../../config/redis';

export const getAllSubredditsRouteHandler = async (
  request: Request,
  response: Response,
) => {
  let subreddits: Subreddit[] | string[] = await redis.actions.smembers(
    'subreddits',
  );

  if (subreddits.length === 0) {
    const srs = await getRepository(Subreddit).find({
      select: ['id', 'name', 'description'],
    });

    srs.forEach((s: Subreddit) => {
      redis.actions.sadd(
        'subreddits',
        JSON.stringify({
          id: s.id,
          name: s.name,
          description: s.description,
        }),
      );
    });

    subreddits = srs;
  } else {
    subreddits = subreddits.map((s) => JSON.parse(s));
  }

  response.json({ subreddits });
};
