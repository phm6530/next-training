import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { db } from "@/db/db";
import { users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      // 비동기
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        // 사용자가 없거나 비밀번호가 제공되지 않은 경우
        if (!user || !credentials.password) {
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        // bcrypt로 비밀번호 비교
        const passwordMatch = await compare(
          credentials.password as string,
          user.password!
        );

        if (!passwordMatch) {
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        return {
          id: user.id.toString(),
          email: user.email?.toString(),
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 15 * 60, //15분
  },
});
