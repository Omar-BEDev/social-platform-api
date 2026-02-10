import { NextFunction, Request, Response } from 'express';
import { loginSchema, userSchema } from './users.schema';
import { ApiError } from '../../utils/ApiError';

export const validateSignData = (req: Request, res: Response, next: NextFunction) => {
  const result = userSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    next(new ApiError(result.error.message, 400));
  }
};

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    next(new ApiError(result.error.message, 400));
  }
};
