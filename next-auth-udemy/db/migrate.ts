import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const migrationClient = postgres(process.env.DATABASE_URL!);

const db = drizzle(migrationClient);

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  await migrationClient.end();
}

main();
