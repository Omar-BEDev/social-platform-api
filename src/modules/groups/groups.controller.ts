import { Request, Response } from 'express';
import * as groupService from './groups.service';
import { IGroup } from './groups.model';
import { AuthRequest } from '../../utils/payload';
import { ApiError } from '../../utils/ApiError';


export const groupPost = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { groupId } = req.params;
    const { content, languageTag, frameworkTag } = req.body;
    const authorId = req.user.id; 
    const post = await groupService.createGroupPost(groupId, authorId, content, languageTag, frameworkTag);
    res.status(201).json(post);
};

export const getGroupPosts = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const { groupId } = req.params;
    const userId = req.user.id; 
    const posts = await groupService.getGroupPosts(groupId, userId);
    res.status(200).json(posts);
};

export const createGroup = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError('User not authenticated',403)
    const ownerId = req.user.id;
    const slug = await groupService.generateSlug(req.body.name);
    const groupData: IGroup = groupService.makeGroupData({...req.body, slug}, ownerId);
    const newGroup = await groupService.createGroup(groupData, ownerId);
    res.status(201).json(newGroup);
};

export const joinGroup = (req: Request, res: Response) => {};