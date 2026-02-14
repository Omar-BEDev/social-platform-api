
import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
import { validateAdminParams, validateAdminGroupParams, isAdmin, validateAdminCommentParams } from './admin.validation';
import { bannedGroupMember, changeMemberRole, changeAccespost, deleteGroupComment } from './admin.controller';
import { creationLimiter } from '../../middleware/rate-limit';

const router = Router();

//Admin of group(api/groups/admin)
router.put("/:groupId/:userId/ban",authUser,isAdmin,validateAdminParams,bannedGroupMember)
router.put("/:groupId/:userId/role",authUser,isAdmin,validateAdminParams,changeMemberRole)
router.post("/:groupId",authUser,isAdmin,validateAdminGroupParams,creationLimiter,changeAccespost)
router.post("/:authorId/:groupId",authUser,isAdmin,validateAdminCommentParams, deleteGroupComment)

export default router;
