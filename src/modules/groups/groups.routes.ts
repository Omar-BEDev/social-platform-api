
import { Router } from 'express';
import { validateGroupParams, validateGroupPostData } from './groups.validation';
import { groupPost, getGroupPosts } from './groups.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

//Group routes (api/groups)
router.post("/:groupeId/post",authUser,validateGroupParams,validateGroupPostData,groupPost)
router.get("/:groupId/posts",authUser,validateGroupParams,getGroupPosts)

export default router;
