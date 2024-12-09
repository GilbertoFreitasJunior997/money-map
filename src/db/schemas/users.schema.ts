import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text().notNull().unique(),
  name: text().notNull(),
  password: text(),
  googleId: text("google_id"),
  githubId: text("github_id"),
});
