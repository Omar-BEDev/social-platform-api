
import { Router } from 'express';
import { validateSignData, validateLoginData } from './users.validation';
import { signup, login, feedPosts } from './users.controller';
import { authUser } from '../../middleware/auth.middleware';

const router = Router();

//user routes (api/users)
router.post("/signup",validateSignData,signup)
router.post("/login",validateLoginData,login)
router.get("/feed",authUser,feedPosts)

export default router;
