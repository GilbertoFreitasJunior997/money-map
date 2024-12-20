import { TransactionsFormSchemaData } from "@/app/(core)/transactions/_components/transactions-form";
import { transactionsFormTypeItems } from "@/app/(core)/transactions/_components/transactions-form/consts";
import { db } from "@/db";
import { accountsTable } from "@/db/schemas/accounts.schema";
import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import { transactionsTable } from "@/db/schemas/transactions.schema";
import { checkUser } from "@/lib/session";
import {
  Transaction,
  TransactionInsert,
  TransactionListData,
} from "@/models/transaction.model";
import { desc, eq } from "drizzle-orm";
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
      )
      .orderBy(desc(transactionsTable.createdAt));

    return data;
  },
  getEditData: async (id: number): Promise<TransactionsFormSchemaData> => {
    await checkUser();

    const [dbData] = await db
      .select({
        description: transactionsTable.description,
        notes: transactionsTable.notes,
        amount: transactionsTable.amount,
        type: transactionsTable.type,
        date: transactionsTable.date,
        account: {
          id: accountsTable.id,
          label: accountsTable.name,
        },
        category: {
          id: transactionCategoriesTable.id,
          label: transactionCategoriesTable.name,
        },
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.id, id))
      .leftJoin(
        accountsTable,
        eq(accountsTable.id, transactionsTable.accountId),
      )
      .leftJoin(
        transactionCategoriesTable,
        eq(transactionCategoriesTable.id, transactionsTable.categoryId),
      );

    if (!dbData) {
      throw new Error("Transaction not found");
    }

    const data = {
      ...dbData,
      amount: Number.parseFloat(dbData.amount),
      type:
        transactionsFormTypeItems.find((item) => item.label === dbData.type) ||
        transactionsFormTypeItems[0],
    } as TransactionsFormSchemaData;

    return data;
  },
};
