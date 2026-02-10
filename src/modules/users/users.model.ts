import { Schema, model, InferSchemaType, Document } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    address: {
        city: { type: String },
        country: { type: String }
    },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    portfolioImage: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    language: {
        type: [String],
        validate: (v: string[]) => Array.isArray(v) && v.length <= 6
    },
    framework: {
        type: [String],
        validate: (v: string[]) => Array.isArray(v) && v.length <= 3
    }
}, { timestamps: true });

export type IUser = InferSchemaType<typeof userSchema>;
export interface IUserDocument extends IUser, Document { }
const User = model<IUser>('User', userSchema);

export default User;
