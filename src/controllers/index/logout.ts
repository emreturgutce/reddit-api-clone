import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connection } from '../../config/database';
import { User } from '../../models/user';

export const logoutRouteHandler = async (
  request: Request,
  response: Response,
) => {
  const user = await getRepository(User).findOne(request.user!.id);

  user!.deleteAuthToken();

  await connection.get().manager.save(user);

  request.session = null;
  request.logout();

  response.json({
    message: 'Logged out',
  });
};
