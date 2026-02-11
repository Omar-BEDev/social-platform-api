import { NextFunction, Request, Response } from 'express';
import { groupParamsSchema, groupPostSchema } from './groups.schema';
import { ApiError } from '../../utils/ApiError';

export const validateGroupParams = (req: Request, res: Response, next: NextFunction) => {
  const result = groupParamsSchema.safeParse(req.params);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};

export const validateGroupPostData = (req: Request, res: Response, next: NextFunction) => {
  const result = groupPostSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(result.error.message, 400);
  }
  next();
};
