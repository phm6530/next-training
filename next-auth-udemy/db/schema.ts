import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

// User TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  twoFactorAuthSecrect: text("2fz_secret"),
  twoFactorAuthActivated: boolean("2fa_activetad").default(false),
});
