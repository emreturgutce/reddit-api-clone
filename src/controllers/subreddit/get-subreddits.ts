import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../models/user';

export const getSubredditsRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOne({
    where: { id: userId },
    relations: ['subreddits'],
  });

  response.json({ user });
};
