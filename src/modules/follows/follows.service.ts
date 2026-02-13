import { ApiError } from '../../utils/ApiError';
import Follow from './follows.model';
import User from '../users/users.model';

export const follow = async (currentUserId: string, targetUserId: string) => {
    if (currentUserId === targetUserId) {
        throw new ApiError('You cannot follow yourself', 400);
    }

    const existingFollow = await Follow.findOne({ followerId: currentUserId, followingId: targetUserId });

    if (existingFollow) {
        throw new ApiError('You are already following this user', 400);
    }

    const newFollow = await Follow.create({ followerId: currentUserId, followingId: targetUserId });

    await User.findByIdAndUpdate(currentUserId, { $inc: { following: 1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followers: 1 } });

    return { message: 'Successfully followed user' };
};

export const unfollow = async (currentUserId: string, targetUserId: string) => {
    if (currentUserId === targetUserId) {
        throw new ApiError('You cannot unfollow yourself', 400);
    }

    const existingFollow = await Follow.findOneAndDelete({ followerId: currentUserId, followingId: targetUserId });

    if (!existingFollow) {
        throw new ApiError('You are not following this user', 400);
    }

    await User.findByIdAndUpdate(currentUserId, { $inc: { following: -1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followers: -1 } });

    return { message: 'Successfully unfollowed user' };
};
