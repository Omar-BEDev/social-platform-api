import { NextFunction, Request, Response } from 'express';
import { postSchema, postParamsSchema } from './posts.schema';
import { ApiError } from '../../utils/ApiError';

export const validatePostData = (req: Request, res: Response, next: NextFunction) => {
  const result = postSchema.safeParse(req.body);
  if (!result.success) {
    return next(new ApiError(result.error.message, 400));
  }
  next();
};

export const validatePostParams = (req: Request, res: Response, next: NextFunction) => {
  const result = postParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ApiError(result.error.message, 400));
  }
  next();
};
