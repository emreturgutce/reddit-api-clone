import { Router, Request, Response } from 'express';
import { connection } from '../../config/database';
import { passportJwt } from '../../middlewares/passport-jwt';
import { Subreddit } from '../../models/subreddit';

const router = Router();

router.post('/r', passportJwt, async (request: Request, response: Response) => {
  const userId = request.user!.id;
  const { name, description } = request.body;

  const repository = new Subreddit();
  repository.name = name;
  repository.description = description;
  repository.createdBy = userId;

  await connection.get().manager.save(repository);

  return response.status(201).json(repository);
});

export { router as addSubredditRouter };
