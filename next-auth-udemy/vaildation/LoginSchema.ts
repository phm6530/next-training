import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  email: z.string().email({ message: "email 형식이 아닙니다." }),
  password: passwordSchema,
});
