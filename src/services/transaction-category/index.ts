import { transactionCategoriesTable } from "@/db/schemas/transaction-categories.schema";
import { TransactionCategory, TransactionCategoryInsert } from "@/models/transaction-category.model";
import { createService } from "../_base";

export const transactionCategoryService = createService<TransactionCategory, TransactionCategoryInsert>(transactionCategoriesTable);
