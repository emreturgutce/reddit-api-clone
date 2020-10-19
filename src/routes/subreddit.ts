import { Router } from 'express';
import { getSubredditsRouteHandler } from '../controllers/subreddit/get-subreddits';
import { validateCreateNewSubreddit } from '../middlewares/validate-create-new-subreddit';
import { createNewSubredditRouteHandler } from '../controllers/subreddit/create-new-subreddit';
import { getAllSubredditsRouteHandler } from '../controllers/subreddit/get-all-subreddits';
import { joinSubredditRouteHandler } from '../controllers/subreddit/join-subreddit';
import { leaveSubredditRouteHandler } from '../controllers/subreddit/leave-subreddit';
import { validatePost } from '../middlewares/validate-post';
import { postRouteHandler } from '../controllers/subreddit/post';
import { updateSubredditRouteHandler } from '../controllers/subreddit/update-subreddit';
import { deleteSubredditRouteHandler } from '../controllers/subreddit/delete-subreddit';

const router = Router();

router.get('/', getSubredditsRouteHandler);
router.post('/', validateCreateNewSubreddit, createNewSubredditRouteHandler);
router.get('/all', getAllSubredditsRouteHandler);
router.put('/:subredditName', updateSubredditRouteHandler);
router.delete('/:subredditName', deleteSubredditRouteHandler);
router.get('/:subredditName/join', joinSubredditRouteHandler);
router.get('/:subredditName/leave', leaveSubredditRouteHandler);
router.post('/:subredditName', validatePost, postRouteHandler);

export { router as subredditRouter };
