import { NextFunction, Response } from "express";
import { AuthRequest } from "../../utils/payload";
import { ApiError } from "../../utils/ApiError";
import GroupMember from "../groups/groupMembers.model";
import { catchError } from "../../utils/catchErr";

export const isGroupAdmin = catchError(async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if(!req.user) throw new ApiError("User not authenticated", 403)
    const userRole = await GroupMember.findOne({memberId: req.user.id, groupId: req.params.groupId})
    .select("role")
    .lean()
    if(!userRole) throw new ApiError("User is not a member of the group", 403)
    if(userRole.role !== "admin") throw new ApiError("User is not admin", 403)
    next()
})

