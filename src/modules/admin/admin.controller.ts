import { Request, Response } from 'express';
import { banUser, changeRole, changePostAccess, deleteGroupComment as deleteGroupCommentService } from './admin.service';

export const bannedGroupMember = async (req: Request, res: Response) => {
    const { groupId, userId } = req.body;
    const result = await banUser(groupId, userId);
    res.status(200).json(result);
};
export const changeMemberRole = async (req: Request, res: Response) => {
    const { groupId, userId } = req.body;
    const result = await changeRole(groupId, userId);
    res.status(200).json(result);
};
export const changeAccespost = async (req: Request, res: Response) => {
    const { groupId } = req.body;
    const result = await changePostAccess(groupId);
    res.status(200).json(result);
};

export const deleteGroupComment = async (req: Request, res: Response) => {
    const { groupId, authorId } = req.params;
    const result = await deleteGroupCommentService(groupId, authorId);
    res.status(200).json(result);
};
