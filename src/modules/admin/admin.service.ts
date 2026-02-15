import GroupMember from "../groups/groupMembers.model";
import Group from "../groups/groups.model";
import { ApiError } from "../../utils/ApiError";
import { Types } from "mongoose";
import Comment from "../comments/comments.model";

export const banUser = async (
  groupId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const groupMember = await GroupMember.findOne({
    groupId: groupId,
    memberId: userId,
  });
  if (!groupMember) {
    throw new ApiError("User not a member in group", 404);
  }
  groupMember.isBanned = true;
  await groupMember.save();
  return { message: "User banned successfully" };
};

export const changeRole = async (
  groupId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const groupMember = await GroupMember.findOne({
    groupId: groupId,
    memberId: userId,
  });
  if (!groupMember) {
    throw new ApiError("User not a member in group", 404);
  }
  groupMember.role = "admin";
  await groupMember.save();
  return { message: "Role changed successfully" };
};

export const changePostAccess = async (groupId: Types.ObjectId) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError("Group not found", 404);
  }
  group.accessPost = "admin";
  await group.save();
  return { message: "Post access changed successfully" };
};

export const deleteGroupComment = async (groupId: string, authorId: string) => {
  const comment = await Comment.findOneAndDelete({
    groupId: groupId,
    authorId: authorId,
  });
  if (!comment) {
    throw new ApiError("Comment not found", 404);
  }
  return { message: "Comment deleted successfully" };
};
