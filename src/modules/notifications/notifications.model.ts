import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    recipientId: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
notificationSchema.index({recepientId: 1, createdAt: -1})
notificationSchema.index(
     {createdAt: -1},
    {expireAfterSeconds: 60 * 60 * 24}
)
export type INotification = InferSchemaType<typeof notificationSchema>;

export const Notification = model<INotification>('Notification', notificationSchema);