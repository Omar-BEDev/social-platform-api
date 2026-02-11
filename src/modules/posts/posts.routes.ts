
import { Router } from 'express';
import { validatePostData, validatePostParams, validatePostContent } from './posts.validation';
import { createPost, deletePost, updatePost, getUserPosts } from './posts.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

//posts routes (api/posts)
router.post("/",authUser,validatePostData,createPost)
router.delete("/:postId",authUser,validatePostParams,deletePost)
router.put("/:postId",authUser,validatePostParams,validatePostContent,updatePost)
router.get("/:userId/posts",authUser,validatePostParams,getUserPosts)

export default router;
