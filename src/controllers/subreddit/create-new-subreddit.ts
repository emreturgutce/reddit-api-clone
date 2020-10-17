import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

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

  return response.status(201).json({ subreddit });
};
