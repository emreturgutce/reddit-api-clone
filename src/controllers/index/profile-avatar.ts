import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sharp from 'sharp';
import { User } from '../../models/user';
import { connection } from '../../config/database';
import { encrypt } from '../../utils/encrypt-decrypt';

export const profileAvatarRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const buffer = await sharp(request.file.buffer)
    .resize({
      width: 250,
      height: 250,
    })
    .jpeg()
    .toBuffer();

  user.avatar = encrypt(buffer);

  await connection.get().manager.save(user);

  response.json({ message: 'Avatar image saved' });
};
