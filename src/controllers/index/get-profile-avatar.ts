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

  let avatar: Buffer | undefined;

  if (user.avatar) {
    const decrypted = decrypt(user.avatar);
    fs.writeFileSync('second.txt', decrypted);
    fs.writeFileSync('picture.png', decrypted);
    avatar = decrypted;
  }

  response.json({ message: 'Avatar image saved', avatar: user.avatar });
};
