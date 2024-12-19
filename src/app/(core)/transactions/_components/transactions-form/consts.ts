import { SelectBaseItem } from "@/components/select-input/types";
import { transactionTypeEnum } from "@/db/schemas/transactions.schema";
import { uppercaseFirstLetter } from "@/lib/utils";

export const TRANSACTIONS_FORM_ID = "transactions_form_id";

export const transactionsFormTypeItems: SelectBaseItem[] =
  transactionTypeEnum.enumValues.map((value, index) => ({
    id: index + 1,
    label: uppercaseFirstLetter(value),
  }));
