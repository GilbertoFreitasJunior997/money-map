import { accountsTable } from "@/db/schemas/accounts.schema";
import { Account, AccountInsert } from "@/models/account.model";
import { createService } from "../_base";

export const accountService = createService<Account, AccountInsert>(accountsTable);
