import { IUser, User } from "./users.model";
import { Post } from "../posts/posts.model";
import { Follow } from "../follows/follows.model";
import { GroupMember } from "../groups/groupMembers.model";
import { ApiError } from "../../utils/ApiError";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Types } from "mongoose";
import { signUpBody } from "./users.schema";

const JWT_SECRET = process.env.JWT_SECRET;

export const makeUserData = (body: any) => {
  const {
    name,
    email,
    password,
    nickname,
    birthday,
    language,
    framework,
    portfolioImage,
  } = body;
  return {
    name,
    nickname,
    email,
    password,
    birthday,
    language,
    framework,
    portfolioImage,
    followers: 0,
    following: 0,
  };
};

export const signup = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  const token = jwt.sign({ id: user._id }, JWT_SECRET as string,{expiresIn: '1h'});
  return { message: "User created successfully", token };
};

export const login = async (body: Pick<IUser, "email" | "password">) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw new ApiError("Invalid credentials", 401);
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET as string,{expiresIn: '1h'});
  return { message: "Logged in successfully", token };
};

export const feed = async (userId: Types.ObjectId) => {
  const follows = await Follow.find({ followerId: userId })
    .select("followingId")
    .lean();
  const followsIds = follows.map((f) => f.followingId);

  const groups = await GroupMember.find({ memberId: userId })
    .select("groupId")
    .lean();
  const groupsIds = groups.map((g) => g.groupId);

    const posts = await Post.find({
        $or : [
            {authorId : userId }, 
            {authorId : {$in : followsIds}},
            {groupId : {$in : groupsIds}}
        ]
    })
    .sort({createdAt : -1})
    .populate("authorId","name nickName portfolioImage")
    .limit(20)
    return posts;
    }

    export const getUserById = (userId : Types.ObjectId) => {
        const userInfo = User.findById(userId).select("-password").lean()
        return userInfo
    }
