import { NextFunction, Request, Response } from 'express';
import { followParamsSchema, authRequestSchema } from './follows.schema';
import { ApiError } from '../../utils/ApiError';
import { AuthRequest } from '../../utils/payload';

export const validateFollowParams = (req: Request, res: Response, next: NextFunction) => {
  const result = followParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

export const validateUserId = (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = authRequestSchema.safeParse(req.user);
    if (!result.success) {
        throw new ApiError(result.error.message, 400);
    }
    next();
}