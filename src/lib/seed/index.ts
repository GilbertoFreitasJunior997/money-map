import { seedAccounts } from "./seed-accounts";
import { seedCategories } from "./seed-categories";
import { seedTransactions } from "./seed-transactions";

export const seed = async (userId: number) => {
  const createdCategories = await seedCategories(userId);
  const createdAccounts = await seedAccounts(userId);

  await seedTransactions(userId, createdCategories, createdAccounts);
};
