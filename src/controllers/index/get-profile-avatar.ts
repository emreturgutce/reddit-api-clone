import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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

  let avatar: Buffer | undefined;

  if (user.avatar) {
    avatar = decrypt(user.avatar);
  }

  response.json({ message: 'Avatar image saved', avatar });
};
