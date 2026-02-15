import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recepientId: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
});

export type INotification = InferSchemaType<typeof notificationSchema> & Document;

export const Notification = model<INotification>('Notification', notificationSchema);