import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";

//보안게이트에 걸리면 이게 실행
export default NextAuth(authConfig).auth;

//보안게이트
export const config = {
  matcher: ["/auth/login"],
};
