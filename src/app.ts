import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import { router } from './routes';

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

app.use(router);

export { app };
