import { transactionInstallmentsTable } from "@/db/schemas/transaction-installments.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type TransactionInstallment = InferSelectModel<
  typeof transactionInstallmentsTable
>;

export type TransactionInstallmentInsert = InferInsertModel<
  typeof transactionInstallmentsTable
>;
