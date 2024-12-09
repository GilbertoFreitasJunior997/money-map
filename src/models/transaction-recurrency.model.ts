import { transactionRecurrenciesTable } from "@/db/schemas/transaction-recurrencies.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type TransactionRecurrencies = InferSelectModel<
  typeof transactionRecurrenciesTable
>;

export type TransactionRecurrenciesInsert = InferInsertModel<
  typeof transactionRecurrenciesTable
>;
