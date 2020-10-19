import { Router } from 'express';
import { homeRouteHandler } from '../controllers/index/home';
import { loginRouteHandler } from '../controllers/index/login';
import { logoutRouteHandler } from '../controllers/index/logout';
import { profileAvatarRouteHandler } from '../controllers/index/profile-avatar';
import { signupRouteHandler } from '../controllers/index/signup';
import { passportJwt } from '../middlewares/passport-jwt';
import { passportLogin } from '../middlewares/passport-login';
import { passportSignup } from '../middlewares/passport-signup';
import { uploadAvatar } from '../middlewares/upload-avatar';
import { validateLogin } from '../middlewares/validate-login';
import { validateSignup } from '../middlewares/validate-signup';

const router = Router();

router.get('/', passportJwt, homeRouteHandler);
router.post('/signup', validateSignup, passportSignup, signupRouteHandler);
router.post('/login', validateLogin, passportLogin, loginRouteHandler);
router.get('/logout', passportJwt, logoutRouteHandler);
router.post(
  '/profile/avatar',
  passportJwt,
  uploadAvatar,
  profileAvatarRouteHandler,
);

export { router as indexRouter };
