import {
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, userId } from "./_utils";
import { accountsTable } from "./accounts.schema";
import { transactionCategoriesTable } from "./transaction-categories.schema";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "expense",
  "income",
  "transfer",
]);

export const transactionsTable = pgTable("transactions", {
  id: id(),
  description: text(),
  notes: text().notNull(),
  amount: decimal().notNull(),
  type: transactionTypeEnum().notNull(),
  date: date({
    mode: "date",
  }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  accountId: integer("account_id").references(() => accountsTable.id),
  categoryId: integer("category_id").references(
    () => transactionCategoriesTable.id,
  ),
  userId: userId(),
});
