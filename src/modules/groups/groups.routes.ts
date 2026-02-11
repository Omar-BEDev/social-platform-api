import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
import { validateGroupParams, validateGroupPostData } from './groups.validation';
import { groupPost, getGroupPosts } from './groups.controller';

const router = Router();

router.post("/:groupeId/post");
router.get("/:groupId/posts");

export default router;
