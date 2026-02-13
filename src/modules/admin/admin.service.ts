
import GroupMember from "../groups/groupMembers.model";
import Group from "../groups/groups.model";
import { ApiError } from "../../utils/ApiError";
import { Types } from "mongoose";


export const banUser = async (groupId: Types.ObjectId,userId : Types.ObjectId) => {
	const groupMember = await GroupMember.findOne({ groupId: groupId, memberId: userId });
    if(!groupMember){
        throw new ApiError("User not a member in group",404)
    }
    groupMember.isBanned = true
    await groupMember.save()
    return groupMember
} 

export const changeRole = async (groupId : Types.ObjectId, userId: Types.ObjectId) => {
	const groupMember = await GroupMember.findOne({ groupId: groupId, memberId: userId });
    if(!groupMember){
        throw new ApiError("User not a member in group",404)
    }
    groupMember.role = "admin"
    await groupMember.save()
    return groupMember
}
 
export const changePostAccess = async (groupId : Types.ObjectId) => {
	const group = await Group.findById(groupId)
    if(!group){
        throw new ApiError("Group not found",404)
    }
    group.accessPost = "admin"
    await group.save()
    return group
}
