import { Request, Response, NextFunction } from "express";
import { commentContentSchema, commentParamsSchema } from "./comments.schema";
import { ApiError } from "../../utils/ApiError";

export const validationCommentContent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = commentContentSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

export const validationCommentParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = commentParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};
