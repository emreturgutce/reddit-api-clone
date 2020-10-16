import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';
import createHttpError from 'http-errors';
import { connection } from './database';
import { User } from '../models/user';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { username } = req.body;
      try {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        await connection.get().manager.save(user);

        const token = await user.generateAuthToken();

        await connection.get().manager.save(user);

        req.session!.token = token;

        done(null, { id: user.id });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await getRepository(User).findOne({ where: { email } });

        if (!user || !user.comparePassword(password)) {
          throw new createHttpError.BadRequest('Poor credentials');
        }

        await connection.get().manager.save(user);

        const token = await user.generateAuthToken();

        await connection.get().manager.save(user);

        req.session!.token = token;

        done(null, { id: user.id });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      secretOrKey:
        process.env.NODE_ENV === 'development'
          ? process.env.JWT_SECRET
          : 'test',
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.session!.token]),
    },
    async (req, done) => {
      try {
        done(null, { id: req.id });
      } catch (err) {
        done(err);
      }
    },
  ),
);

export { passport };
