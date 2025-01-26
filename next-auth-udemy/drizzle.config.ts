import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

/**
 * drizzle-kit의 설정 파일은 Next.js의 빌드/실행 프로세스와 별개로 동작합니다.
 *
 * 이 설정 파일은 drizzle CLI 도구가 먼저 읽어들이는데, 이 시점에서는
 * Next.js의 환경 변수 로딩이 아직 이루어지지 않은 상태입니다.
 *
 * 따라서 dotenv를 통해 환경 변수를 명시적으로 로드해야
 * drizzle이 데이터베이스 연결 정보를 올바르게 가져올 수 있습니다.
 */
dotenv.config({ path: ".env.local" });
console.log(process.env.DATABASE_URL);
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
