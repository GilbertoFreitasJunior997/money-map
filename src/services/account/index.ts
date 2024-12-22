import { AccountsFormSchemaData } from "@/app/(core)/accounts/_components/accounts-form";
import { SelectBaseItem } from "@/components/select-input/types";
import { db } from "@/db";
import { accountsTable } from "@/db/schemas/accounts.schema";
import { checkUser } from "@/lib/session";
import {
  Account,
  AccountInsert,
  AccountListData,
} from "@/models/account.model";
import { eq } from "drizzle-orm";
import { createService } from "../_base";

const baseService = createService<Account, AccountInsert>(accountsTable);
export const accountService = {
  ...baseService,
  getSelectData: async (): Promise<SelectBaseItem[]> => {
    const user = await checkUser();

    const data = await db
      .select({
        id: accountsTable.id,
        label: accountsTable.name,
      })
      .from(accountsTable)
      .where(eq(accountsTable.userId, user.id));

    return data;
  },
  getListData: async (): Promise<AccountListData[]> => {
    const user = await checkUser();

    const data = await db
      .select({
        id: accountsTable.id,
        name: accountsTable.name,
      })
      .from(accountsTable)
      .where(eq(accountsTable.userId, user.id));

    return data;
  },
  getEditData: async (id: number): Promise<AccountsFormSchemaData> => {
    const [account] = await db
      .select({
        name: accountsTable.name,
      })
      .from(accountsTable)
      .where(eq(accountsTable.id, id))
      .limit(1);

    return account;
  },
};
