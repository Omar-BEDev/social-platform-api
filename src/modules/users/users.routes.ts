import { Router } from "express";
import { validateSignData, validateLoginData } from "./users.validation";
import { signup, login, feedPosts } from "./users.controller";
import { authUser } from "../../middleware/auth.middleware";
import { authLimiter } from "../../middleware/rate-limit";

const router = Router();

router.post("/signup", validateSignData, authLimiter, signup);
router.post("/login", validateLoginData, authLimiter, login);
router.get("/feed", authUser, feedPosts);

export default router;
