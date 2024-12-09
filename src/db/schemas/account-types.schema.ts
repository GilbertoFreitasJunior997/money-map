import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";

export const accountTypesTable = pgTable("account_types", {
  id: serial().primaryKey(),
  description: text().notNull(),
  observation: text(),

  userId: integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});
