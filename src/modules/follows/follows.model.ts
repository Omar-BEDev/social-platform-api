
import { Schema, model, InferSchemaType, Types, Document } from 'mongoose';

const followSchema = new Schema({
    followerId: { type: Types.ObjectId,  required: true },
    followingId: { type: Types.ObjectId,  required: true }
}, { timestamps: true });

export type IFollow = InferSchemaType<typeof followSchema>;
export interface IFollowDocument extends IFollow, Document { }
export const Follow = model<IFollow>('Follow', followSchema);

export default Follow;
