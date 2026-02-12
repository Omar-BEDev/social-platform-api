
import { Schema, model, InferSchemaType, Types, Document } from 'mongoose';

const groupMemberSchema = new Schema({
    memberId: { type: Types.ObjectId, required: true },
    groupId: { type: Types.ObjectId, required: true },
    groupRole: { type: String, required: true, default: 'member' },
    joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export type IGroupMember = InferSchemaType<typeof groupMemberSchema>;
export interface IGroupMemberDocument extends IGroupMember, Document { }
export const GroupMember = model<IGroupMemberDocument>('GroupMember', groupMemberSchema);

export default GroupMember;
