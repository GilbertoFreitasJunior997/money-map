import { transactionsTable } from "@/db/schemas/transactions.schema";
import { Transaction, TransactionInsert } from "@/models/transaction.model";
import { createService } from "../_base";

export const transactionService = createService<Transaction, TransactionInsert>(transactionsTable);
