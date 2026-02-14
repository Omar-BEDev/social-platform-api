import { Schema, model, Types, InferSchemaType } from 'mongoose';

const commentSchema = new Schema(
    {
        authorId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        groupId: {
            type: String,
            default: null,
        },
        recipientId: {
            type: String,
            required: true,
        },
    },
);
commentSchema.index({ postId: 1, createdAt: -1 }); 
export type IComment = InferSchemaType<typeof commentSchema>;
const Comment = model<IComment>('Comment', commentSchema);
export default Comment;
