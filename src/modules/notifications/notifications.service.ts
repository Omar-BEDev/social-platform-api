import { getIO } from "../../config/socket";
import { catchSocketError } from "../../utils/socketCatchErr";
import User from "../users/users.model";
import { INotification } from "./notifications.model";
import { Notification } from "./notifications.model";
import { Types } from "mongoose";

export const sendAndSaveNotification = async (data: INotification) => {
  const newNotification = await Notification.create(data);

  const io = getIO();
  catchSocketError(() =>
    io
      .to(newNotification.recipientId)
      .emit("new_notification", newNotification),
  );
};

export const getNotifications = async (userId: Types.ObjectId) => {
  const notifications = await Notification.find({
    recipientId: userId.toString(),
  })
    .sort({createdAt: -1})
    .limit(30)
    .lean();
  const usersMakeNotifications = [...new Set(notifications.map((n) => n.userId.toString()))];
  const names = await User.find({ _id: { $in: usersMakeNotifications } })
    .select("name")
    .lean();
  return {
    notifications: notifications,
    count: notifications.length,
    names: names,
  };
};
