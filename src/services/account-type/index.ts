import { db } from "@/db";
import { accountTypesTable } from "@/db/schemas/account-types.schema";
import { accountsTable } from "@/db/schemas/accounts.schema";
import { getUser } from "@/lib/session";
import { AccountType, AccountTypeInsert } from "@/models/account-type.model";
import { eq } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<AccountType, AccountTypeInsert>(
  accountTypesTable,
);

export const accountTypeService = {
  ...baseService,
  getSelectData: async () => {
    const user = await getUser();
    if (!user) {
      return [];
    }

    const data = await db
      .select({
        id: accountTypesTable.id,
        label: accountTypesTable.description,
      })
      .from(accountTypesTable)
      .where(eq(accountTypesTable.userId, user.id));

    return data;
  },
  getHasConnectedAccount: async (id: number) => {
    const data = await db
      .select({
        id: accountsTable.id,
      })
      .from(accountsTable)
      .where(eq(accountsTable.accountTypeId, id))
      .limit(1);

    return !!data.length;
  },
};
