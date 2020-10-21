import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const updateSubredditRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId, {
    select: ['id'],
  });

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
    relations: ['createdBy'],
    select: ['createdBy', 'description', 'name'],
  });

  if (subreddit.createdBy.id !== user.id) {
    throw new createHttpError.BadRequest(
      'User must be the owner of the subreddit that he wants to update',
    );
  }

  const { description } = request.body;

  subreddit.description = description;

  connection.get().manager.save(subreddit);

  response.status(200).json({
    message: `Updated ${subreddit.name} subreddit !`,
  });
};
