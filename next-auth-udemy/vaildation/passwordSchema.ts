import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(5, { message: "비밀번호는 5글자 이상 설정해주세요" });
