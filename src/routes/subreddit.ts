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
import { updatePostRouteHandler } from '../controllers/subreddit/update-post';
import { uploadAvatar } from '../middlewares/upload-avatar';
import { subredditAvatarRouteHandler } from '../controllers/subreddit/subreddit-avatar';

const router = Router();

router.get('/', getSubredditsRouteHandler);
router.post('/', validateCreateNewSubreddit, createNewSubredditRouteHandler);
router.get('/all', getAllSubredditsRouteHandler);
router.put('/:subredditName', updateSubredditRouteHandler);
router.delete('/:subredditName', deleteSubredditRouteHandler);
router.post(
  '/:subredditName/avatar',
  uploadAvatar,
  subredditAvatarRouteHandler,
);
router.get('/:subredditName/join', joinSubredditRouteHandler);
router.get('/:subredditName/leave', leaveSubredditRouteHandler);
router.post('/:subredditName', validatePost, postRouteHandler);
router.put('/:subredditName/:postId', updatePostRouteHandler);

export { router as subredditRouter };
