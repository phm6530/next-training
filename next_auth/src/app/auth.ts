import NextAuth, { NextAuthConfig } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

// type PickParital<T, K extends keyof T> = {
//   [P in K]: T[K];
// } & Partial<Omit<T, K>>;

type User = AdapterUser & {
  id: string; // AdapterUser 필수 필드
  email: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      // 로그인 입력 필드 정의
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      // authorize 함수는 실제 인증 로직을 처리합니다
      async authorize(credentials): Promise<User | null> {
        if (credentials.email && credentials.password) {
          const AdapterOptions = {
            id: crypto.randomUUID(),
            emailVerified: null,
          };

          return {
            email: "1",
            name: "John Doe",
            ...AdapterOptions,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", //Page 설정
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, //30분
    updateAge: 15 * 60, //15분 갱신
  },
  callbacks: {
    authorized({ request, auth }) {
      // 로그인 페이지에 접근하려는 경우
      if (request.nextUrl.pathname === "/auth/login") {
        // 이미 인증된 사용자라면 홈페이지로 리다이렉트
        if (auth) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        // 인증되지 않은 사용자는 로그인 페이지 접근 허용
        return true;
      }

      // 다른 경로에 대한 처리
      return true;
    },
    // Jwt를 생성할때
    async jwt({ token, user }) {
      // user 파라미터로 Credentials의 반환값이 전달됩니다
      if (user) {
        token.user = user;
        // 이 데이터는 암호화되어 JWT 토큰에 저장됩니다
      }
      return token;
    },
    // 클라이언트에서 useSession() 또는 서버에서 getServerSession()을 호출할 때마다 실행
    // 세션에 포함될 사용자 정보를 커스터마이징
    async session({ session, token }) {
      // JWT 토큰에서 복호화된 데이터가 전달됩니다
      // console.log("user:", token.user);
      session.user = token.user as User;
      // 이 데이터가 최종적으로 애플리케이션에서 사용됩니다
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
