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

export const followParamsSchema = z.object({
  userId: objectIdSchema,
});

export const authRequestSchema = z.object({
  id: objectIdSchema,
  role: z.string(),
});
