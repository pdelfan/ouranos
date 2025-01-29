import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const BskyAuthSession = pgTable("auth_session", {
  key: text("key").primaryKey().unique(),
  session: jsonb("session").notNull(),
});

export const BskyAuthState = pgTable("auth_state", {
  key: text("key").primaryKey().unique(),
  state: jsonb("state").notNull(),
});
