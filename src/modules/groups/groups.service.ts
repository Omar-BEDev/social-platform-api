import { IGroup, IGroupDocument } from "./groups.model";
import Group from "./groups.model";
import slugify from "slugify";
import crypto from "crypto";
import GroupMember, { IGroupMember } from "./groupMembers.model";
import Post from "../posts/posts.model";
import { ApiError } from "../../utils/ApiError";
import { Types } from "mongoose";

export const generateSlug = async (name: string): Promise<string> => {
  let slug = slugify(name, { lower: true });
  const groupExists = await Group.findOne({ slug });
  if (groupExists) {
    const randomString = crypto.randomBytes(2).toString("hex");
    slug = `${slug}-${randomString}`;
  }
  return slug;
};
export const makeGroupData = (
  body: IGroup,
  ownerId: Types.ObjectId,
): IGroup => {
  const groupData: IGroup = {
    name: body.name,
    description: body.description,
    ownerId: ownerId,
    slug: body.slug,
    accessPost: "admin",
    icon: body.icon,
    members: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return groupData;
};
export const createGroup = async (
  groupData: IGroup,
  userId: Types.ObjectId,
): Promise<IGroupDocument> => {
  const newGroup = new Group(groupData);
  await newGroup.save();
  const groupMember: IGroupMember = {
    memberId: userId,
    groupId: newGroup._id,
    role: "admin",
    isBanned: false,
    joinedAt: new Date(),
  };
  const newGroupMember = new GroupMember(groupMember);
  await newGroupMember.save();
  return newGroup;
};
export const createGroupPost = async (
  groupId: string,
  authorId: Types.ObjectId,
  content: string,
  languageTag: string[],
  frameworkTag: string[] | undefined,
) => {
  const isMember = await GroupMember.findOne({ groupId, userId: authorId });
  if (!isMember) {
    throw new ApiError("You are not a member of this group", 403);
  }
  const newPost = new Post({
    authorId,
    content,
    languageTag,
    frameworkTag,
    groupTag: groupId,
  });
  await newPost.save();
  return newPost;
};
export const getGroupPosts = async (
  groupId: string,
  userId: Types.ObjectId,
) => {
  const isMember = await GroupMember.findOne({ groupId, userId });
  if (!isMember) {
    throw new ApiError("You are not a member of this group", 403);
  }
  if (isMember.isBanned) {
    throw new ApiError("You are banned from this group", 403);
  }
  const posts = await Post.find({ groupTag: groupId });
  return posts;
};
