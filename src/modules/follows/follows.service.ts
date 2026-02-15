import { ApiError } from "../../utils/ApiError";
import Follow from "./follows.model";
import User from "../users/users.model";
import { Types } from "mongoose";
import { INotification } from "../notifications/notifications.model";
import { sendAndSaveNotification } from "../notifications/notifications.service";

export const follow = async (
  currentUserId: Types.ObjectId,
  targetUserId: string,
) => {
  const targetUserMongoId = new Types.ObjectId(targetUserId);
  if (currentUserId === targetUserMongoId) {
    throw new ApiError("You cannot follow yourself", 400);
  }

  const existingFollow = await Follow.findOne({
    followerId: currentUserId,
    followingId: targetUserMongoId,
  });

  if (existingFollow) {
    throw new ApiError("You are already following this user", 400);
  }

  const newFollow = await Follow.create({
    followerId: currentUserId,
    followingId: targetUserId,
  });

  await User.findByIdAndUpdate(currentUserId, { $inc: { following: 1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followers: 1 } });
  const notificationBody: INotification = {
    userId: currentUserId,
    recipientId: targetUserId,
    type: "follow",
    content: "new follower!",
    createdAt: new Date(),
  };
  await sendAndSaveNotification(notificationBody);
  return { message: "Successfully followed user" };
};

export const unfollow = async (
  currentUserId: Types.ObjectId,
  targetUserId: string,
) => {
  const targetUserMongoId = new Types.ObjectId(targetUserId);

  if (currentUserId === targetUserMongoId) {
    throw new ApiError("You cannot unfollow yourself", 400);
  }

  const existingFollow = await Follow.findOneAndDelete({
    followerId: currentUserId,
    followingId: targetUserMongoId,
  });

  if (!existingFollow) {
    throw new ApiError("You are not following this user", 400);
  }

  await User.findByIdAndUpdate(currentUserId, { $inc: { following: -1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followers: -1 } });

  return { message: "Successfully unfollowed user" };
};

export const followers = async (userId: Types.ObjectId) => {
  const followers = await Follow.find({ followingId: userId }).populate(
    "followerId",
  );
  const following = await Follow.find({ followerId: userId }).populate(
    "followingId",
  );
  return { followers, following };
};
