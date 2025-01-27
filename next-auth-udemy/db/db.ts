import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// NEXT_PUBLIC_ 은 클라이언트에 노출되므로 제거하는 것이 좋습니다
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false, max: 10 });
export const db = drizzle(client);
