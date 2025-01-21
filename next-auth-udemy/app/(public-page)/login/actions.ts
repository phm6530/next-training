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
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {}
};

export const logout = async () => {
  await signOut();
};
