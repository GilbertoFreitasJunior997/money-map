import { transactionsTable } from "@/db/schemas/transactions.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Transaction = InferSelectModel<typeof transactionsTable>;

export type TransactionInsert = InferInsertModel<typeof transactionsTable>;
