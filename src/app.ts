import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error-handler';
import { notFound } from './middlewares/not-found';
import cookieSession from 'cookie-session';

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
  })
);

app.use(notFound);
app.use(errorHandler);

export { app };
