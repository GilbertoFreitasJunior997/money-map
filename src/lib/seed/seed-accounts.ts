import { AccountInsert } from "@/models/account.model";
import { accountService } from "@/services/account";

const accounts = ["Credit Card", "Debit Card", "Cash"];

export const seedAccounts = async (userId: number) => {
  const insertAccounts: AccountInsert[] = accounts.map((name) => ({
    name,
    userId,
  }));

  const createdAccounts = await accountService.createBulk(insertAccounts);
  return createdAccounts;
};
