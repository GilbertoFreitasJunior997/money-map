import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, userId } from "./_utils";

export const transactionCategoriesTable = pgTable("transaction_categories", {
  id: id(),
  name: text().notNull(),

  createdAt: createdAt(),
  updatedAt: updatedAt(),
  userId: userId(),
});
