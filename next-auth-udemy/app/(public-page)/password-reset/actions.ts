"use server";

import { db } from "@/db/db";
import { passwordResetTokens, users } from "@/db/schema";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export const passwordReset = async (userEmail: string) => {
  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, userEmail));

  if (!user) {
    return {
      error: true,
      message: "존재하지 않는 유저",
    };
  }

  const randomToken = randomBytes(32).toString("hex");
  const tokenExpriy = new Date(Date.now() + 60 * 60 * 1000); //1시간설정

  await db
    .insert(passwordResetTokens)
    .values({
      userId: user.id,
      token: randomToken,
      tokenExpriy,
    })

    /**
     * onConfilctDoUpdate
     * Pk나 중복된 키가 있을 경우의 에러를 캐치하여 기존이 컬럼에 데이터를 upDate
     */
    .onConflictDoUpdate({
      target: passwordResetTokens.userId,
      set: {
        token: randomToken,
        tokenExpriy,
      },
    });
};
