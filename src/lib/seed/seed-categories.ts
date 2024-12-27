import { TransactionCategoryInsert } from "@/models/transaction-category.model";
import { Transaction } from "@/models/transaction.model";
import { transactionCategoryService } from "@/services/transaction-category";

export const transactionCategories: {
  name: string;
  type: Transaction["type"];
}[] = [
  { name: "Housing", type: "expense" },
  { name: "Groceries", type: "expense" },
  { name: "Transport", type: "expense" },
  { name: "Shopping", type: "expense" },
  { name: "Savings", type: "transfer" },
  { name: "Investments", type: "expense" },
  { name: "Insurance", type: "expense" },
  { name: "Education", type: "expense" },
  { name: "Personal Care", type: "expense" },
  { name: "Salary", type: "income" },
  { name: "Freelance", type: "income" },
  { name: "Transfer", type: "transfer" },
  { name: "Entertainment", type: "expense" },
  { name: "Utilities", type: "expense" },
  { name: "Healthcare", type: "expense" },
  { name: "Gifts", type: "expense" },
];

export const seedCategories = async (userId: number) => {
  const insertTransactionCategories: TransactionCategoryInsert[] =
    transactionCategories.map((category) => ({
      name: category.name,
      userId,
    }));

  const createdCategories = await transactionCategoryService.createBulk(
    insertTransactionCategories,
  );
  return createdCategories;
};
