import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./schema";

export const passwordResetTokens = pgTable("password_reset_token", {
  id: serial().primaryKey(),
  //FK
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  token: text("token"),
  tokenExpriy: timestamp("token_expiry"),
});
