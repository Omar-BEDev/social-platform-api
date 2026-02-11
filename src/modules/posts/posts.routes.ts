import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
import { validatePostData, validatePostParams, validatePostContent } from './posts.validation';
import { createpost, deletePost, updatePost, getUserPosts } from './posts.controller';

const router = Router();

router.post("/");
router.delete("/:postId");
router.put("/:postId");
router.get("/:userId/posts");

export default router;
