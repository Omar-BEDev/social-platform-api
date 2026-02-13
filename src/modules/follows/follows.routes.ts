
import { Router } from 'express';
import { validateFollowParams, validateUserId } from './follows.validation';
import { followUser, getFollows, unfollowUser } from './follows.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

// follows route (api/follows)
router.post("/:userId/follow",authUser,validateFollowParams,followUser)
router.post("/:userId/unfollow",authUser,validateFollowParams,unfollowUser)
router.post("/",authUser,validateUserId,getFollows)
export default router;
