import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { notFound } from './middlewares/not-found';
import { indexRouter } from './routes/index';
import { signUpRouter } from './routes/signup';
import { loginRouter } from './routes/login';
import { getSubredditsRouter } from './routes/subreddit/get-subreddits';
import { createNewSubredditRouter } from './routes/subreddit/create-new-subreddit';
import { joinSubredditRouter } from './routes/subreddit/join-subreddit';
import { logoutRouter } from './routes/logout';
import { postRouter } from './routes/subreddit/post';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(
  cookieSession({
    name: 'auth_token',
    signed: false,
  }),
);

app.use(indexRouter);
app.use(signUpRouter);
app.use(loginRouter);
app.use(getSubredditsRouter);
app.use(createNewSubredditRouter);
app.use(joinSubredditRouter);
app.use(postRouter);
app.use(logoutRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
