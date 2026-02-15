import { Router } from "express";
import {
  validatePostData,
  validatePostParams,
  validatePostContent,
} from "./posts.validation";
import {
  createPost,
  deletePost,
  updatePost,
  getUserPosts,
} from "./posts.controller";
import { authUser } from "../../middleware/auth.middleware";
import { creationLimiter } from "../../middleware/rate-limit";

const router = Router();

//posts routes (api/posts)
router.post("/", authUser, validatePostData, creationLimiter, createPost);
router.delete("/:postId", authUser, validatePostParams, deletePost);
router.put(
  "/:postId",
  authUser,
  validatePostParams,
  validatePostContent,
  creationLimiter,
  updatePost,
);
router.get("/:userId/posts", authUser, validatePostParams, getUserPosts);

export default router;
