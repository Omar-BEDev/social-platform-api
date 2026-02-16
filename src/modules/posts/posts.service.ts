import { IPost } from "./posts.model";
import Post from "./posts.model";
import { ApiError } from "../../utils/ApiError";
import { Types } from "mongoose";

export const makePostData = (body: IPost): IPost => {
  const postData: IPost = {
    authorId: body.authorId,
    content: body.content,
    languageTag: body.languageTag,
    frameworkTag: body.frameworkTag,
    likesCount: 0,
    groupId: null,
    createdAt: new Date(),
  };
  return postData;
};

export const createPost = async (postData: IPost, userId: Types.ObjectId) => {
  const newPost = new Post({
    ...postData,
    authorId: userId,
    groupId: null,
  });
  return await newPost.save();
};

export const deletePost = async (postId: string, userId: Types.ObjectId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError("Post not found", 404);
  }
  if (post.authorId.toString() !== userId.toString()) {
    throw new ApiError("You are not authorized to delete this post", 403);
  }
  await Post.findByIdAndDelete(postId);
};

export const updatePost = async (
  postId: string,
  body: Partial<IPost>,
  userId: Types.ObjectId,
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError("Post not found", 403);
  }
  if (post.authorId.toString() !== userId.toString()) {
    throw new ApiError("You are not authorized to update this post", 403);
  }
  return await Post.findByIdAndUpdate(
    postId,
    { content: body.content },
    { new: true },
  );
};

export const getUserPosts = async (userId: string) => {
  return await Post.find({ authorId:  new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .limit(20);
};
