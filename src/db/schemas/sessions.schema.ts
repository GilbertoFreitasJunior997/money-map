import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userId } from "./_utils";

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),

  userId: userId(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
