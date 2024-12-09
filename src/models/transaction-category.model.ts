import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type TransactionCategory = InferSelectModel<
  typeof transactionCategoriesTable
>;

export type TransactionCategoryInsert = InferInsertModel<
  typeof transactionCategoriesTable
>;
