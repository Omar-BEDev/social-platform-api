import { Request, Response } from 'express';
import * as postService from './posts.service';
import { IPost } from './posts.model';
import { AuthRequest } from '../../utils/payload';
import { ApiError } from '../../utils/ApiError';

export const createPost = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const userId = req.user.id ;
    const postData: IPost = postService.makePostData(req.body);
    const newPost = await postService.createPost(postData, userId);
    res.status(201).json(newPost);
};

export const deletePost = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { postId } = req.params;
    const userId = req.user.id ;
    await postService.deletePost(postId, userId);
    res.status(204).send();
};

export const updatePost = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { postId } = req.params;
    const userId = req.user.id ;
    const updatedPost = await postService.updatePost(postId, req.body, userId);
    res.status(200).json(updatedPost);
};

export const getUserPosts = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const posts = await postService.getUserPosts(userId);
    res.status(200).json(posts);
};