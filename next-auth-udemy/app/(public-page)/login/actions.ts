"use server";

import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/vaildation/LoginSchema";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const isVaild = loginSchema.safeParse({ email, password });

  if (!isVaild.success) {
    return {
      error: true,
      message: isVaild.error.issues[0].message ?? "Error",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: _) {
    return {
      error: true,
      message: "이메일 또는 비밀번호가 일치하지 않습니다.",
    };
  }
};

export const logout = async () => {
  await signOut();
};
