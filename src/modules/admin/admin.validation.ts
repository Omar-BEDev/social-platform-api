import { NextFunction, Request, Response } from "express";
import {
  adminParamsSchema,
  adminGroupParamsSchema,
  adminCommentParamsSchema,
} from "./admin.schema";
import { ApiError } from "../../utils/ApiError";
import { AuthRequest } from "../../utils/payload";

export const validateAdminParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = adminParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

export const validateAdminGroupParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = adminGroupParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

export const validateAdminCommentParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = adminCommentParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

