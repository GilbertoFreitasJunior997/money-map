import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { sessionsTable } from "./sessions.schema";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text().notNull().unique(),
  name: text().notNull(),
  password: text(),
  googleId: text("google_id"),
  githubId: text("github_id"),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
}));
