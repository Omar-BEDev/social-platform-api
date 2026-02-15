import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(8)
  .max(50)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#|\\@$!%*?&])[A-Za-z\d#|\\@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  );

export const userSchema = z.object({
  name: z.string().min(1),
  nickname: z.string().min(1),
  birthday: z.coerce.date(),
  address: z
    .object({
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  password: passwordValidation,
  email: z.string().email(),
  language: z.array(z.string()).max(6).optional(),
  framework: z.array(z.string()).max(3).optional(),
});
export type signUpBody = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordValidation,
});
