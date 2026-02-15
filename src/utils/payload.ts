import { Request } from "express";
import { Types } from "mongoose";

export interface IUserPayload {
  id: Types.ObjectId;
  role: string;
}
export interface AuthRequest extends Request {
  user?: IUserPayload;
}
