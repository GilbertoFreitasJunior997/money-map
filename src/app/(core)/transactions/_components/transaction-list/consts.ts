import { transactionTypeEnum } from "@/db/schemas/transactions.schema";

export const transactionListFilters = [
  "all",
  ...transactionTypeEnum.enumValues,
] as const;
