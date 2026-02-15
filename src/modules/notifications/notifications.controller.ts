import { Request, Response } from "express";
import { AuthRequest } from "../../utils/payload";
import { ApiError } from "../../utils/ApiError";
import { getNotifications } from "./notifications.service";

export const getNotificationsController = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) throw new ApiError("User not authenticated", 403);
  const userId = req.user.id;
  const notifications = await getNotifications(userId);
  res.status(200).json(notifications);
};
