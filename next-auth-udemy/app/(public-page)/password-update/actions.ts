"use server";

import { z } from "zod";
import { db } from "@/db/db";
import { passwordResetTokens, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { passwordsMatchSchema } from "@/vaildation/passwordMatchcSchema";
import { hash } from "bcryptjs";

export const changePassword = async ({
  token,
  password,
  passwordConfirm,
}: {
  token: string;
} & z.infer<typeof passwordsMatchSchema>) => {
  const isVaild = passwordsMatchSchema.safeParse({
    password,
    passwordConfirm,
  });

  //   서버에서도 한번 더
  if (!isVaild.success) {
    return {
      error: true,
      message: "",
    };
  }

  const [userToken] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token));

  const now = Date.now();
  if (!userToken.tokenExpriy || now > userToken.tokenExpriy.getTime()) {
    return {
      error: true,
      message: "만료된 페이지 입니다.",
    };
  }

  const hashedPassword = await hash(password, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, userToken.id));

  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token));
};
