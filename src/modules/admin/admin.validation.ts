import { NextFunction, Request, Response } from 'express';
import { adminParamsSchema, adminGroupParamsSchema } from './admin.schema';
import { ApiError } from '../../utils/ApiError';

export const validateAdminParams = (req: Request, res: Response, next: NextFunction) => {
  const result = adminParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ApiError(result.error.message, 400));
  }
  next();
};

export const validateAdminGroupParams = (req: Request, res: Response, next: NextFunction) => {
  const result = adminGroupParamsSchema.safeParse(req.params);
  if (!result.success) {
    return next(new ApiError(result.error.message, 400));
  }
  next();
};
