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

app.use(notFound);
app.use(errorHandler);

export { app };
