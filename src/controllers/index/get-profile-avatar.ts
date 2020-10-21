import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fs from 'fs';
import { User } from '../../models/user';
import { decrypt } from '../../utils/encrypt-decrypt';

export const getProfileAvatarRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId, {
    select: ['avatar'],
  });

  response.json({ message: 'Avatar image saved', avatar: user.avatar });
};
