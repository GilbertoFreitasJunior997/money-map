import { accountsTable } from "@/db/schemas/accounts.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Account = InferSelectModel<typeof accountsTable>;
export type AccountListData = Pick<Account, "id" | "name">;

export type AccountInsert = InferInsertModel<typeof accountsTable>;
