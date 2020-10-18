import { Router } from 'express';
import { getSubredditsRouteHandler } from '../controllers/subreddit/get-subreddits';
import { validateCreateNewSubreddit } from '../middlewares/validate-create-new-subreddit';
import { createNewSubredditRouteHandler } from '../controllers/subreddit/create-new-subreddit';
import { getAllSubredditsRouteHandler } from '../controllers/subreddit/get-all-subreddits';
import { joinSubredditRouteHandler } from '../controllers/subreddit/join-subreddit';
import { postRouteHandler } from '../controllers/subreddit/post';
import { validatePost } from '../middlewares/validate-post';

const router = Router();

router.get('/', getSubredditsRouteHandler);
router.post('/', validateCreateNewSubreddit, createNewSubredditRouteHandler);
router.get('/all', getAllSubredditsRouteHandler);
router.get('/:subredditName/join', joinSubredditRouteHandler);
router.post('/:subredditName', validatePost, postRouteHandler);

export { router as subredditRouter };
