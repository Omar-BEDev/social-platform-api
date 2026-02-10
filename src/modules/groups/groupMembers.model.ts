
import { Schema, model, InferSchemaType, Types, Document } from 'mongoose';

const groupMemberSchema = new Schema({
    memberId: { type: Types.ObjectId, required: true },
    groupId: { type: Types.ObjectId, required: true },
}, { timestamps: true });

export type IGroupMember = InferSchemaType<typeof groupMemberSchema>;
export interface IGroupMemberDocument extends IGroupMember, Document { }
const GroupMember = model<IGroupMemberDocument>('GroupMember', groupMemberSchema);

export default GroupMember;
