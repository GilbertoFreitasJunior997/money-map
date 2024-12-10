import { transactionInstallmentsTable } from "@/db/schemas/transaction-installments.schema";
import { TransactionInstallment, TransactionInstallmentInsert } from "@/models/transaction-installment.model";
import { createService } from "../_base";

export const transactionInstallmentService = createService<TransactionInstallment, TransactionInstallmentInsert>(transactionInstallmentsTable);
