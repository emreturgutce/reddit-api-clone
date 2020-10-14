import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/user';
import { connection } from './database';
import createHttpError from 'http-errors';

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

        await connection.manager.save(user);

        const token = await user.generateAuthToken();

        await connection.manager.save(user);

        done(null, { user, token });
      } catch (err) {
        done(err);
      }
    }
  )
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
        const user = await User.findOne({ where: { email } });

        if (!user?.comparePassword(password))
          throw new createHttpError.BadRequest('Poor credentials');

        await connection.manager.save(user);

        const token = await user.generateAuthToken();

        await connection.manager.save(user);

        done(null, { user, token });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (req, done) => {
      try {
        console.log(req);
        const user = await User.findOne();

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

export { passport };
