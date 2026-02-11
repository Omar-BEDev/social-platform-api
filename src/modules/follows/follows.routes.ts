import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
import { validateFollowParams } from './follows.validation';
import { followUser, infollowUser } from './follows.controller';

const router = Router();

router.post("/:userId/follow");
router.post("/:userId/unfollow");

export default router;
