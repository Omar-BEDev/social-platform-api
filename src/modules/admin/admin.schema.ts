import { z } from 'zod';
import { Types } from 'mongoose';

export const objectIdSchema = z.string().refine((val) => {
    return Types.ObjectId.isValid(val);
}, {
    message: "Invalid ObjectId",
});

export const adminParamsSchema = z.object({
  userId: objectIdSchema,
  groupId: objectIdSchema,
});

export const adminGroupParamsSchema = z.object({
    groupId: objectIdSchema,
});

export const adminCommentParamsSchema = z.object({
    authorId: objectIdSchema,
    groupId: objectIdSchema,
});
