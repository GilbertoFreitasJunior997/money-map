import { transactionRecurrenciesTable } from "@/db/schemas/transaction-recurrencies.schema";
import { TransactionRecurrency, TransactionRecurrencyInsert } from "@/models/transaction-recurrency.model";
import { createService } from "../_base";

export const transactionRecurrencyService = createService<TransactionRecurrency, TransactionRecurrencyInsert>(transactionRecurrenciesTable);
