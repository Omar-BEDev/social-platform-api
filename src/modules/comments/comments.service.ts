import Comment, { IComment } from "./comments.model";
import { ApiError } from "../../utils/ApiError";
import { Types } from "mongoose";
import Post from "../posts/posts.model";
import { INotification } from "../notifications/notifications.model";
import { sendAndSaveNotification } from "../notifications/notifications.service";

// comments services ("api/comments")
export const createComment = async (
  authorId: Types.ObjectId,
  postId: string,
  content: string,
  groupId?: string,
) => {
  const recipient = await Post.findOne({ _id: postId })
    .select("authorId")
    .lean();

  if (!recipient) {
    throw new ApiError("Recipient not found", 404);
  }

  const newComment: IComment = {
    authorId,
    postId,
    content,
    recipientId: recipient.authorId.toString(),
  };

  if (groupId) {
    newComment.groupId = groupId;
  }

  const comment = new Comment(newComment);
  await comment.save();
  const notificationBody: INotification = {
    userId: authorId,
    recipientId: comment.recipientId,
    type: "follow",
    content: "new follower!",
    createdAt: new Date(),
  };
  await sendAndSaveNotification(notificationBody);
  return comment;
};

export const updateComment = async (
  userId: string,
  commentId: string,
  newContent: string,
) => {
  const comment = await Comment.findOne({ commentId});

  if (!comment) {
    throw new ApiError("Comment not found", 404);
  }

  if (comment.authorId.toString() !== userId ) {
    throw new ApiError("You are not authorized to update this comment", 403);
  }

  comment.content = newContent;
  await comment.save();

  return { message: "Comment updated successfully" };
};

export const deleteComment = async (userId: string, commentId: string) => {
  const commentMongoId = new Types.ObjectId(commentId);
  const comment = await Comment.findOne({ commentMongoId });

  if (!comment) {
    throw new ApiError("Comment not found", 404);
  }

  if (
    comment.authorId.toString() !== userId &&
    comment.recipientId !== userId
  ) {
    throw new ApiError("You are not authorized to delete this comment", 403);
  }

  await Comment.deleteOne({ commentMongoId });

  return { message: "Comment deleted successfully" };
};

export const getComments = async (commentId: string) => {
  const commentMongoId = new Types.ObjectId(commentId);
  const comments = await Comment.find({  commentMongoId })
  .populate("authorId", "name nickname portfolioImage")
  .limit(20);
  return comments;
};
