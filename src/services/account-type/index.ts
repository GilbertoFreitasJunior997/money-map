import { db } from "@/db";
import { accountTypesTable } from "@/db/schemas/account-types.schema";
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
};
