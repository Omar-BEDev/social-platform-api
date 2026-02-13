
import { Schema, model, InferSchemaType, Types, Document } from 'mongoose';

const groupMemberSchema = new Schema({
    memberId: { type: Types.ObjectId, required: true },
    groupId: { type: Types.ObjectId, required: true },
    isBanned: { type: Boolean, default: false },
    role : { type: String,  default: 'member' },
    joinedAt: { type: Date, default: Date.now }
});

export type IGroupMember = InferSchemaType<typeof groupMemberSchema>;
export interface IGroupMemberDocument extends IGroupMember, Document { }
export const GroupMember = model<IGroupMemberDocument>('GroupMember', groupMemberSchema);

export default GroupMember;
