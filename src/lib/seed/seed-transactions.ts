import { Account } from "@/models/account.model";
import { TransactionCategory } from "@/models/transaction-category.model";
import { TransactionInsert } from "@/models/transaction.model";
import { transactionService } from "@/services/transaction";
import { transactionCategories } from "./seed-categories";

const transactionDescriptions: Record<string, string[]> = {
  Housing: ["Monthly Rent", "Utilities", "Home Insurance", "Property Tax"],
  Groceries: ["Supermarket", "Local Market", "Convenience Store"],
  Transport: ["Gas", "Bus Ticket", "Train Pass", "Car Maintenance"],
  Shopping: ["Clothing", "Electronics", "Home Goods"],
  Savings: ["Monthly Savings Transfer", "Emergency Fund"],
  Investments: ["Stock Purchase", "Mutual Fund Investment"],
  Insurance: ["Life Insurance", "Health Insurance"],
  Education: ["Course Fee", "Books", "Online Classes"],
  "Personal Care": ["Haircut", "Gym Membership", "Pharmacy"],
  Salary: ["Monthly Salary", "Annual Bonus"],
  Freelance: ["Project Payment", "Consulting Fee"],
  Transfer: ["Account Transfer", "Money Movement"],
  Entertainment: ["Movie Tickets", "Restaurant", "Concert"],
  Utilities: ["Electricity Bill", "Water Bill", "Internet"],
  Healthcare: ["Doctor Visit", "Medicine", "Lab Tests"],
  Gifts: ["Birthday Gift", "Holiday Shopping", "Charity Donation"],
};

const getRandomAmount = (category: string) => {
  const ranges: Record<string, [number, number]> = {
    Housing: [1000, 3000],
    Groceries: [50, 300],
    Transport: [20, 200],
    Shopping: [50, 500],
    Savings: [500, 2000],
    Investments: [1000, 5000],
    Insurance: [100, 500],
    Education: [200, 1000],
    "Personal Care": [20, 200],
    Salary: [3000, 8000],
    Freelance: [500, 3000],
    Transfer: [100, 1000],
    Entertainment: [20, 200],
    Utilities: [50, 300],
    Healthcare: [50, 500],
    Gifts: [20, 200],
  };

  const [min, max] = ranges[category] || [10, 100];
  return (Math.random() * (max - min) + min).toFixed(2);
};

const getRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
  return new Date(
    threeMonthsAgo.getTime() +
      Math.random() * (Date.now() - threeMonthsAgo.getTime()),
  );
};

const getRandomItem = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const seedTransactions = async (
  userId: number,
  createdCategories: TransactionCategory[],
  createdAccounts: Account[],
) => {
  const numTransactions = Math.floor(Math.random() * 51) + 50;
  const transactions: TransactionInsert[] = [];

  for (let i = 0; i < numTransactions; i++) {
    const category = getRandomItem(transactionCategories);
    const categoryId = createdCategories.find(
      (c) => c.name === category.name,
    )?.id;

    const account = getRandomItem(createdAccounts);

    const amount = getRandomAmount(category.name);
    const description = getRandomItem(
      transactionDescriptions[category.name] || ["Transaction"],
    );

    transactions.push({
      description,
      amount,
      type: category.type,
      date: getRandomDate(),
      accountId: account.id,
      categoryId,
      userId,
      notes: `Seed transaction for ${category.name}`,
    });
  }

  const createdTransactions = await transactionService.createBulk(transactions);
  return createdTransactions;
};
