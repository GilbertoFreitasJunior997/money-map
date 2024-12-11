import { db } from "@/db";
import { accountTypesTable } from "@/db/schemas/account-types.schema";
import { accountsTable } from "@/db/schemas/accounts.schema";
import { getUser } from "@/lib/session";
import { Account, AccountInsert } from "@/models/account.model";
import { eq, sql } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<Account, AccountInsert>(accountsTable);
export const accountService = {
  ...baseService,
  getTableData: async () => {
    const user = await getUser();
    if (!user) {
      return [];
    }

    const data = await db
      .select({
        id: accountsTable.id,
        name: accountsTable.name,
        balance: accountsTable.balance,
        type: sql<string>`${accountTypesTable.description}`,
      })
      .from(accountsTable)
      .where(eq(accountsTable.userId, user.id))
      .leftJoin(
        accountTypesTable,
        eq(accountsTable.accountTypeId, accountTypesTable.id),
      );

    return data;
  },
};
