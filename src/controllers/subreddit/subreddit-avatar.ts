import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import sharp from 'sharp';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { Subreddit } from '../../models/subreddit';
import { User } from '../../models/user';

export const subredditAvatarRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const userId = request.user!.id;

  const user = await getRepository(User).findOneOrFail(userId);

  const subreddit = await getRepository(Subreddit).findOneOrFail({
    where: { name: request.params.subredditName },
    relations: ['createdBy'],
  });

  if (subreddit.createdBy.id !== user.id) {
    throw new createHttpError.Unauthorized(
      'You must be the owner it If you want to update a subreddit.',
    );
  }

  const buffer = await sharp(request.file.buffer)
    .resize({
      width: 500,
      height: 500,
    })
    .jpeg()
    .toBuffer();

  subreddit.image = buffer;

  await connection.get().manager.save(subreddit);

  response.json({ message: 'Avatar image saved' });
};
