import { Router } from 'express';
import { validateSignData, validateLoginData } from './users.validation';
import { signup, login, feedPosts } from './users.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

router.post("/signup");
router.post("/login");
router.get("/feed");

export default router;
