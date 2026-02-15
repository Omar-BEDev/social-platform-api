import { getIO } from "../../config/socket";
import { INotification } from "./notifications.model";
import { Notification } from "./notifications.model";

export const sendAndSaveNotifacation = async (data: INotification) => {
    const newNotification = await Notification.create(data);

    const io = getIO()
    io.to(newNotification.recepientId).emit("new_notification", newNotification);
    return newNotification;
}
