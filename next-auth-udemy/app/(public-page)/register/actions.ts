"use server";

import { z } from "zod";
import { passwordsMatchSchema } from "@/vaildation/passwordMatchcSchema";
import { registerSchema } from "@/vaildation/registerSchema";
import { hash } from "bcryptjs";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: z.infer<typeof registerSchema>) => {
  const formSchema = z
    .object({
      email: z.string().email({ message: "email 형식이 아닙니다." }),
    })
    .and(passwordsMatchSchema);

  const newUserVaildation = formSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });

  if (!newUserVaildation.success) {
    return {
      error: true,
      message: newUserVaildation.error.issues[0].message ?? "Error!",
    };
  }

  // 비밀번호 해쉬화
  const hashedPassword = await hash(password, 10);
  const [row] = await db.select().from(users).where(eq(users.email, email));
  if (row) {
    throw new Error("이미 가입된 유저입니다.");
  }
  return await db.insert(users).values({ email, password: hashedPassword });
};
