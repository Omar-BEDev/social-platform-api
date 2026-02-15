import { Router } from "express";
import {
  validateGroupParams,
  validateGroupPostData,
  validateGroupReqbody,
} from "./groups.validation";
import {
  groupPost,
  getGroupPosts,
  createGroup,
  joinGroup,
} from "./groups.controller";
import { authUser } from "../../middleware/auth.middleware";
import { creationLimiter } from "../../middleware/rate-limit";

const router = Router();

//Group routes (api/groups)
router.post("/", authUser, validateGroupReqbody, createGroup);
router.post("/:groupId", authUser, joinGroup);
router.post(
  "/:groupeId/post",
  authUser,
  validateGroupParams,
  validateGroupPostData,
  creationLimiter,
  groupPost,
);
router.get("/:groupId/posts", authUser, validateGroupParams, getGroupPosts);

export default router;
