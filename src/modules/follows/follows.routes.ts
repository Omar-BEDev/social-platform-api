import { Router } from "express";
import { validateFollowParams, validateUserId } from "./follows.validation";
import { followUser, getFollows, unfollowUser } from "./follows.controller";
import { authUser } from "../../middleware/auth.middleware";
import { creationLimiter } from "../../middleware/rate-limit";

const router = Router();

router.post(
  "/:userId/follow",
  authUser,
  validateFollowParams,
  creationLimiter,
  followUser,
);
router.post(
  "/:userId/unfollow",
  authUser,
  validateFollowParams,
  creationLimiter,
  unfollowUser,
);
router.post("/", authUser, validateUserId, getFollows);
export default router;
