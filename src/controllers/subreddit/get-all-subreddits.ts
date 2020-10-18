import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Subreddit } from '../../models/subreddit';

export const getAllSubredditsRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const subreddits = await getRepository(Subreddit).find();

  response.json({ subreddits });
};
