import { SelectBaseItem } from "@/components/select-input/types";
import { db } from "@/db";
import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import { checkUser } from "@/lib/session";
import {
  TransactionCategory,
  TransactionCategoryInsert,
} from "@/models/transaction-category.model";
import { eq } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<
  TransactionCategory,
  TransactionCategoryInsert
>(transactionCategoriesTable);

export const transactionCategoryService = {
  ...baseService,
  getSelectData: async (): Promise<SelectBaseItem[]> => {
    const user = await checkUser();

    const data = await db
      .select({
        id: transactionCategoriesTable.id,
        label: transactionCategoriesTable.name,
      })
      .from(transactionCategoriesTable)
      .where(eq(transactionCategoriesTable.userId, user.id));

    return data;
  },
};
