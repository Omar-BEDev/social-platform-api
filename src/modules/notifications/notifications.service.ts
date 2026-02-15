import { getIO } from "../../config/socket";
import { catchSocketError } from "../../utils/socketCatchErr";
import { INotification } from "./notifications.model";
import { Notification } from "./notifications.model";
import { Types } from 'mongoose';


export const sendAndSaveNotifacation = async (data: INotification) => {
    const newNotification = await Notification.create(data);
    
    const io = getIO()
    catchSocketError(() => io.to(newNotification.recepientId)
    .emit(
        "new_notification", 
        newNotification
    ))
    
}

export const getNotifications = async (userId: Types.ObjectId) => {
    const notifications = await Notification.find({ recepientId: userId.toString() });
    return notifications;
};