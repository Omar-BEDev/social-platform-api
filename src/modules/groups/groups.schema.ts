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

export const groupParamsSchema = z.object({
  id: objectIdSchema,
});

export const groupPostSchema = z.object({
  authorId: objectIdSchema,
  content: z.string().min(1).max(2000),
  languageTag: z.array(z.string()).min(1).max(6),
  frameworkTag: z.array(z.string()).max(3).optional(),
  groupId: objectIdSchema,
});

export const groupReqbodySchema = z.object({
  name: z.string(),
  description: z.string(),
});
