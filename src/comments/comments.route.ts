import { Router } from 'express';
import { authUser } from '../middleware/auth.middleware';
import { creationLimiter } from '../middleware/rate-limit';
import { createComment, updateComment, deleteComment, getComments } from './comments.controller';
import { validationCommentContent, validationCommentParams } from './comments.validation';

const router = Router();

// Comments routes
router.post("/:postId/:groupId?",authUser,validationCommentContent,validationCommentParams,creationLimiter,createComment)
router.put("/:postId/:groupId?",authUser,validationCommentContent,validationCommentParams,creationLimiter,updateComment)
router.delete("/:postId/:groupId",authUser,validationCommentParams,deleteComment)
router.get("/:postId",authUser,validationCommentParams,getComments)

export default router;