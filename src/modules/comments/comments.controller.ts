import { Request, Response } from 'express';
import * as commentService from './comments.service';
import { AuthRequest } from '../../utils/payload';
import { ApiError } from '../../utils/ApiError';

export const createComment = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { postId, groupId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const comment = await commentService.createComment(userId, postId, content, groupId);
    res.status(201).json(comment);
};

export const updateComment = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const result = await commentService.updateComment(userId.toString(), postId, content);
    res.status(200).json(result);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { postId } = req.params;
    const userId = req.user.id;
    const result = await commentService.deleteComment(userId.toString(), postId);
    res.status(200).json(result);
};

export const getComments = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const comments = await commentService.getComments(postId);
    res.status(200).json(comments);
};
