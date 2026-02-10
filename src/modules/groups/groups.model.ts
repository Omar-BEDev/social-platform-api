
import { Schema, model, InferSchemaType, Types, Document } from 'mongoose';

const groupSchema = new Schema({
    name: { type: String, required: true },
    members: { type: Number, default: 0 },
    slug: { type: String, unique: true, required: true },
    icon: { type: String },
    description: { type: String },
    ownerId: { type: Types.ObjectId, required: true }
}, { timestamps: true });

export type IGroup = InferSchemaType<typeof groupSchema>;
export interface IGroupDocument extends IGroup, Document { }
const Group = model<IGroupDocument>('Group', groupSchema);

export default Group;
