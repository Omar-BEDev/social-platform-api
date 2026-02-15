import { z } from "zod";
import { Types } from "mongoose";

export const objectIdSchema = z.string().refine(
  (val) => {
    return Types.ObjectId.isValid(val);
  },
  {
    message: "Invalid ObjectId",
  },
);

export const postSchema = z.object({
  content: z.string().min(1).max(2000),
  languageTag: z.array(z.string()).min(1).max(6),
  frameworkTag: z.array(z.string()).max(3).optional(),
  groupId: objectIdSchema.optional(),
});

export const postParamsSchema = z.object({
  id: objectIdSchema,
});

export const postContentSchema = z.object({
  content: z.string().min(1).max(2000),
});
