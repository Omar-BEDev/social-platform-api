import { Request, Response } from 'express';
import * as userService from './users.service';
import { IUser } from './users.model';
import { AuthRequest } from '../../utils/payload';
import { ApiError } from '../../utils/ApiError';

export const signup = async (req: Request, res: Response) => {
    const userData: IUser = userService.makeUserData(req.body);
    const result = await userService.signup(userData);
    res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
    const result = await userService.login(req.body);
    res.status(200).json(result);
};

export const feedPosts = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403);
    const userId = req.user.id;
    const posts = await userService.feed(userId);
    res.status(200).json(posts);
};