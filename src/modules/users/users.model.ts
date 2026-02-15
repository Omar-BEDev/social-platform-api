import { Schema, model, InferSchemaType, Document } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  birthday: { type: Date, required: true },
  address: {
    city: { type: String },
    country: { type: String },
  },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  portfolioImage: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  language: {
    type: [String],
    validate: (v: string[]) => Array.isArray(v) && v.length <= 6,
  },
  framework: {
    type: [String],
    validate: (v: string[]) => Array.isArray(v) && v.length <= 3,
  },
});
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  return;
});
export type IUser = InferSchemaType<typeof userSchema>;
export interface IUserDocument extends IUser, Document {}
export const User = model<IUser>("User", userSchema);

export default User;
