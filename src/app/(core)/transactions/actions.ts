"use server";

import { SelectBaseItem } from "@/components/select-input/types";
import { transactionTypeEnum } from "@/db/schemas/transactions.schema";
import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { Transaction, TransactionType } from "@/models/transaction.model";
import { accountService } from "@/services/account";
import { transactionService } from "@/services/transaction";
import { transactionCategoryService } from "@/services/transaction-category";
import { TransactionsFormSchemaData } from "./_components/transactions-form";

export const createTransaction = async (
  data: TransactionsFormSchemaData,
): Promise<ActionResult<Transaction>> => {
  try {
    const user = await checkUser();

    const type = transactionTypeEnum.enumValues.includes(
      data.type.label as TransactionType,
    )
      ? (data.type.label as TransactionType)
      : (transactionTypeEnum.enumName[0] as TransactionType);

    const newTransaction = await transactionService.create({
      amount: data.amount.toString(),
      type: type,
      accountId: data.account.id,
      categoryId: data.category.id,
      date: data.date.toString(),
      description: data.description,
      notes: data.notes,
      userId: user.id,
    });

    return {
      success: true,
      data: newTransaction,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const getTransactionFormTransactionCategories = async (): Promise<
  ActionResult<SelectBaseItem[]>
> => {
  try {
    await checkUser();

    const data = await transactionCategoryService.getSelectData();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getTransactionFormAccounts = async (): Promise<
  ActionResult<SelectBaseItem[]>
> => {
  try {
    await checkUser();

    const data = await accountService.getSelectData();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
