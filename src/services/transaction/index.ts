import { db } from "@/db";
import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import { transactionsTable } from "@/db/schemas/transactions.schema";
import { checkUser } from "@/lib/session";
import {
  Transaction,
  TransactionInsert,
  TransactionListData,
} from "@/models/transaction.model";
import { eq } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<Transaction, TransactionInsert>(
  transactionsTable,
);

export const transactionService = {
  ...baseService,
  getListData: async (): Promise<TransactionListData[]> => {
    const user = await checkUser();

    const data = await db
      .select({
        id: transactionsTable.id,
        description: transactionsTable.description,
        notes: transactionsTable.notes,
        amount: transactionsTable.amount,
        type: transactionsTable.type,
        category: transactionCategoriesTable.name,
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, user.id))
      .leftJoin(
        transactionCategoriesTable,
        eq(transactionsTable.categoryId, transactionCategoriesTable.id),
      );

    return data;
  },
};
