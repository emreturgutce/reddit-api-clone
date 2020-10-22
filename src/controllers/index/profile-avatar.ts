import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sharp from 'sharp';
import fs from 'fs';
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

  const encrypted = encrypt(buffer);

  fs.writeFileSync('first.txt', encrypted);

  user.avatar = encrypted;

  await connection.get().manager.save(user);

  response.json({ message: 'Avatar image saved' });
};
