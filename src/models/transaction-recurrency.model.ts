import { transactionRecurrenciesTable } from "@/db/schemas/transaction-recurrencies.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type TransactionRecurrency = InferSelectModel<
  typeof transactionRecurrenciesTable
>;

export type TransactionRecurrencyInsert = InferInsertModel<
  typeof transactionRecurrenciesTable
>;
