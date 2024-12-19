import { transactionsTable } from "@/db/schemas/transactions.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Transaction = InferSelectModel<typeof transactionsTable>;
export type TransactionListData = Pick<
  Transaction,
  "id" | "description" | "notes" | "amount" | "type"
> & {
  category: string | null;
};
export type TransactionType = Transaction["type"];

export type TransactionInsert = InferInsertModel<typeof transactionsTable>;
