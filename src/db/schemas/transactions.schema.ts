import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts.schema";
import { transactionCategoriesTable } from "./transaction-categories.schema";
import { usersTable } from "./users.schema";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "expense",
  "income",
  "transfer",
]);

export const transactionsTable = pgTable("transactions", {
  id: serial().primaryKey(),
  description: text().notNull(),
  observation: text(),
  amount: decimal().notNull(),
  type: transactionTypeEnum().notNull(),
  isRecurring: boolean("is_recurring").notNull(),

  accountId: integer("account_id").references(() => accountsTable.id),
  categoryId: integer("category_id").references(
    () => transactionCategoriesTable.id,
  ),
  userId: integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});
