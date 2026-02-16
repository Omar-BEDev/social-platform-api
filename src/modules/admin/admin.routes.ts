import { Router } from "express";
import { authUser } from "../../middleware/auth.middleware";
import {
  validateAdminParams,
  validateAdminGroupParams,
  validateAdminCommentParams,
} from "./admin.validation";
import {
  bannedGroupMember,
  changeMemberRole,
  changeAccespost,
  deleteGroupComment,
} from "./admin.controller";
import { creationLimiter } from "../../middleware/rate-limit";
import { isGroupAdmin } from "./admin.middleware";

const router = Router();

//Admin of group(api/groups/admin)
router.put(
  "/:groupId/:userId/ban",
  authUser,
  isGroupAdmin,
  validateAdminParams,
  bannedGroupMember,
);
router.put(
  "/:groupId/:userId/role",
  authUser,
  isGroupAdmin,
  validateAdminParams,
  changeMemberRole,
);
router.post(
  "/:groupId",
  authUser,
  isGroupAdmin,
  validateAdminGroupParams,
  creationLimiter,
  changeAccespost,
);
router.post(
  "/:authorId/:groupId",
  authUser,
  isGroupAdmin,
  validateAdminCommentParams,
  deleteGroupComment,
);

export default router;
