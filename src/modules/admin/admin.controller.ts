import { Request, Response } from "express";
import {
  banUser,
  changeRole,
  changePostAccess,
  deleteGroupComment as deleteGroupCommentService,
} from "./admin.service";
import { Types } from "mongoose";

export const bannedGroupMember = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  const result = await banUser(new Types.ObjectId(groupId), new Types.ObjectId(userId));
  res.status(200).json(result);
};
export const changeMemberRole = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  const result = await changeRole(new Types.ObjectId(groupId), new Types.ObjectId(userId));
  res.status(200).json(result);
};
export const changeAccespost = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const result = await changePostAccess(new Types.ObjectId(groupId));
  res.status(200).json(result);
};

export const deleteGroupComment = async (req: Request, res: Response) => {
  const { groupId, authorId } = req.params;
  const result = await deleteGroupCommentService(groupId, authorId);
  res.status(200).json(result);
};
