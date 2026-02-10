import { NextFunction, Request, Response } from 'express';
import { followParamsSchema } from './follows.schema';
import { ApiError } from '../../utils/ApiError';

export const validateFollowParams = (req: Request, res: Response, next: NextFunction) => {
  const result = followParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ApiError(result.error.message, 400));
  }
  next();
};
