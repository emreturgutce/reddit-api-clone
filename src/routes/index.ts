import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { passportJwt } from '../middlewares/passport-jwt';
import { indexRouter } from './home';
import { subredditRouter } from './subreddit';

const router = Router();

router.use('/', indexRouter);
router.use('/r', passportJwt, subredditRouter);

router.use(notFound);
router.use(errorHandler);

export { router };
