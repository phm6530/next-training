import { z } from "zod";

export const passwordsMatchSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "비밀번호는 5글자 이상 설정해주세요" }),
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
