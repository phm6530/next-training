import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const passwordsMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // Enum
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });
