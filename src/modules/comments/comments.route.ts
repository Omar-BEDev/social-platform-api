import { Router } from "express";
import { authUser } from "../../middleware/auth.middleware";
import { creationLimiter } from "../../middleware/rate-limit";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "./comments.controller";
import {
  validationCommentContent,
  validationCommentParams,
} from "./comments.validation";

const router = Router();

// Comments routes
router.post(
["/:postId","/:postId/:groupId"],
  authUser,
  validationCommentContent,
  validationCommentParams,
  creationLimiter,
  createComment,
);
router.put(
  ["/:commentId","/:commentId/:groupId"],
  authUser,
  validationCommentContent,
  validationCommentParams,
  creationLimiter,
  updateComment,
);
router.delete(
  "/:commentId/:groupId",
  authUser,
  validationCommentParams,
  deleteComment,
);
router.get("/:commentId", authUser, validationCommentParams, getComments);

export default router;
