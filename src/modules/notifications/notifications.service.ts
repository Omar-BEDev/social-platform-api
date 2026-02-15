import { getIO } from "../../config/socket";
import { catchSocketError } from "../../utils/socketCatchErr";
import User from "../users/users.model";
import { INotification } from "./notifications.model";
import { Notification } from "./notifications.model";
import { Types } from "mongoose";

export const sendAndSaveNotifacation = async (data: INotification) => {
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
    createdAt: -1,
  }).limit(30);
  const usersMakeNotifications = [...notifications].map((n) => n.userId);
  const names = await User.find({ _id: { $in: usersMakeNotifications } })
    .select("name")
    .lean();
  return {
    notifications: notifications,
    count: notifications.length,
    names: names,
  };
};
