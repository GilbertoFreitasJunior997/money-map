import { AccountInsert } from "@/models/account.model";
import { TransactionCategoryInsert } from "@/models/transaction-category.model";
import { accountService } from "../account";
import { transactionCategoryService } from "../transaction-category";

const accounts = ["Credit Card", "Debit Card", "Cash"];

const transactionCategories = [
  "Housing",
  "Groceries",
  "Transport",
  "Shopping",
  "Savings",
  "Investments",
  "Insurance",
  "Education",
  "Personal Care",
  "Income",
  "Transfer",
  "Miscellaneous",
];

export const seedNewUser = async (userId: number) => {
  const insertTransactionCategories: TransactionCategoryInsert[] =
    transactionCategories.map((name) => ({
      name,
      userId,
    }));
  await transactionCategoryService.createMany(insertTransactionCategories);

  const insertAccounts: AccountInsert[] = accounts.map((name) => ({
    name,
    userId,
  }));
  await accountService.createMany(insertAccounts);
};
