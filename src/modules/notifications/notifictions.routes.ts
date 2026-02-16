import { Router } from "express";
import { authUser } from "../../middleware/auth.middleware";
import { getNotificationsController } from "./notifications.controller";

const router = Router();
router.get("/", authUser, getNotificationsController);

export default router;
