import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { AuthRequest, IUserPayload } from "../utils/payload";

export const authUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError("Unauthorized: No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new ApiError("Server error: JWT secret not configured", 500);
  }

  const decode = jwt.verify(token, jwtSecret);
  if (!decode) {
    throw new ApiError("Unauthorized: Invalid token", 401);
  }
  req.user = decode as IUserPayload;
  next();
};
