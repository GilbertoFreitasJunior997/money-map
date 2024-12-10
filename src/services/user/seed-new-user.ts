import { AccountTypeInsert } from "@/models/account-type.model";
import { TransactionCategoryInsert } from "@/models/transaction-category.model";
import { accountTypeService } from "../account-type";
import { transactionCategoryService } from "../transaction-category";

const accountTypes = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Cryptocurrency Wallet",
];

const transactionCategories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Healthcare",
  "Transport",
  "Entertainment",
  "Dining Out",
  "Shopping",
  "Travel",
  "Savings",
  "Investments",
  "Insurance",
  "Debt Payment",
  "Education",
  "Fitness",
  "Personal Care",
  "Gifts",
  "Income",
  "Transfer",
  "Miscellaneous",
];

export const seedNewUser = async (id: number) => {
  const insertAccountTypes: AccountTypeInsert[] = accountTypes.map(
    (description) => ({
      description: description,
      userId: id,
    }),
  );
  await accountTypeService.createMany(insertAccountTypes);

  const insertTransactionCategories: TransactionCategoryInsert[] =
    transactionCategories.map((description) => ({
      description: description,
      userId: id,
    }));
  await transactionCategoryService.createMany(insertTransactionCategories);
};
