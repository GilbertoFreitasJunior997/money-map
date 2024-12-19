import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, userId } from "./_utils";

export const accountsTable = pgTable("accounts", {
  id: id(),
  name: text().notNull(),
  note: text(),

  createdAt: createdAt(),
  updatedAt: updatedAt(),
  userId: userId(),
});
