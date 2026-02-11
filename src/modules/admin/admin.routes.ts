import { Router } from 'express';
import { authUser } from '../../middleware/auth.middleware';
//import { isAdmin } from '../../middleware/admin.middleware';
import { validateAdminParams, validateAdminGroupParams } from './admin.validation';
import { bannedGroupMember, changeMemberRole, changeAccespost } from './admin.controller';

const router = Router();

router.put("/:groupId/:userId/ban");
router.put("/:groupId/:userId/role");
router.post("/:groupId");

export default router;
