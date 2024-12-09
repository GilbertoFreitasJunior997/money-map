import { accountTypesTable } from "@/db/schemas/account-types.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type AccountType = InferSelectModel<typeof accountTypesTable>;

export type AccountTypeInsert = InferInsertModel<typeof accountTypesTable>;
