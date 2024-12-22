import { CategoriesFormSchemaData } from "@/app/(core)/categories/_components/categories-form";
import { SelectBaseItem } from "@/components/select-input/types";
import { db } from "@/db";
import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import { checkUser } from "@/lib/session";
import {
  TransactionCategory,
  TransactionCategoryInsert,
  TransactionCategoryListData,
} from "@/models/transaction-category.model";
import { eq } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<
  TransactionCategory,
  TransactionCategoryInsert
>(transactionCategoriesTable);

export const transactionCategoryService = {
  ...baseService,
  getListData: async (): Promise<TransactionCategoryListData[]> => {
    const user = await checkUser();

    const data = await db
      .select({
        id: transactionCategoriesTable.id,
        name: transactionCategoriesTable.name,
      })
      .from(transactionCategoriesTable)
      .where(eq(transactionCategoriesTable.userId, user.id));

    return data;
  },
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
  getEditData: async (id: number): Promise<CategoriesFormSchemaData> => {
    const [data] = await db
      .select({
        name: transactionCategoriesTable.name,
      })
      .from(transactionCategoriesTable)
      .where(eq(transactionCategoriesTable.id, id))
      .limit(1);

    return data;
  },
};
