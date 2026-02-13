
import { Schema, model, InferSchemaType, Types } from 'mongoose';

const postSchema = new Schema({
    authorId: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    languageTag: {
        type: [String],
        required: true,
        validate: (v: string[]) => Array.isArray(v) && v.length >= 1 && v.length <= 6
    },
    frameworkTag: {
        type: [String],
        validate: (v: string[]) => Array.isArray(v) && v.length >= 1 && v.length <= 3
    },
    likesCount: { type: Number, default: 0 },
    groupId: { type: Types.ObjectId, default: null },
    createdAt : { type: Date, default: Date.now }
});

export type IPost = InferSchemaType<typeof postSchema>;
export interface IPostDocument extends IPost, Document { }
export const Post = model<IPost>('Post', postSchema);

export default Post;
