import { z } from "zod";
import mongoose from "mongoose";

export const commentContentSchema = z.object({
  content: z.string().min(1).max(500),
});

export const commentParamsSchema = z.object({
  commentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  groupId: z
    .string()
    .optional()
    .refine((val) => !val || mongoose.Types.ObjectId.isValid(val)),
});
