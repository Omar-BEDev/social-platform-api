
import { Router } from 'express';
import { validateFollowParams } from './follows.validation';
import { followUser, unfollowUser } from './follows.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

// follows route (api/follows)
router.post("/:userId/follow",authUser,validateFollowParams,followUser)
router.post("/:userId/unfollow",authUser,validateFollowParams,unfollowUser)

export default router;
