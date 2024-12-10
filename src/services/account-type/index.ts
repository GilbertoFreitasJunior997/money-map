import { accountTypesTable } from "@/db/schemas/account-types.schema";
import { AccountType, AccountTypeInsert } from "@/models/account-type.model";
import { createService } from "../_base";

export const accountTypeService = createService<AccountType, AccountTypeInsert>(accountTypesTable);
