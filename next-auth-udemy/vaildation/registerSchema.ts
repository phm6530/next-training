import { z } from "zod";
import { passwordsMatchSchema } from "./passwordMatchcSchema";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "email 형식이 아닙니다." }),
  })
  .and(passwordsMatchSchema);
