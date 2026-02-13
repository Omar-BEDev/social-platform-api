import { Response } from 'express';
import { AuthRequest } from '../../utils/payload';
import * as followService from './follows.service';
import { ApiError } from '../../utils/ApiError';

export const followUser = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;
    const result = await followService.follow(currentUserId, targetUserId);
    res.status(201).json(result);
};

export const unfollowUser = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;
    const result = await followService.unfollow(currentUserId, targetUserId);
    res.status(200).json(result);
};

export const getFollows = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const userId = req.user.id;
    const follows = await followService.followers(userId);
    res.status(200).json(follows);
};
