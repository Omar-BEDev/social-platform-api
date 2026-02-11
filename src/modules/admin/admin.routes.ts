
import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
import { validateAdminParams, validateAdminGroupParams, isAdmin } from './admin.validation';
import { bannedGroupMember, changeMemberRole, changeAccespost } from './admin.controller';

const router = Router();

//Admin of group(api/groups/admin)
router.put("/:groupId/:userId/ban",authUser,isAdmin,validateAdminParams,bannedGroupMember)
router.put("/:groupId/:userId/role",authUser,isAdmin,validateAdminParams,changeMemberRole)
router.post("/:groupId",authUser,isAdmin,validateAdminGroupParams,changeAccespost)

export default router;
