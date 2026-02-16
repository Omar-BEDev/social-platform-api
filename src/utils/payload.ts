import { Request } from "express";
import { Types } from "mongoose";

export interface IUserPayload {
  id: Types.ObjectId;
}
export interface AuthRequest extends Request {
  user?: IUserPayload;
}
