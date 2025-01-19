import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
console.log(process.env.NEXT_PUBLIC_DATABASE_URL);
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
