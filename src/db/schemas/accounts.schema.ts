import { decimal, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { accountTypesTable } from "./account-types.schema";
import { usersTable } from "./users.schema";

export const accountsTable = pgTable("accounts", {
  id: serial().primaryKey(),
  name: text().notNull(),
  balance: decimal().notNull(),

  accountTypeId: integer("account_type_id")
    .references(() => accountTypesTable.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
