"use server";

import { SelectBaseItem } from "@/components/select-input/types";
import { transactionTypeEnum } from "@/db/schemas/transactions.schema";
import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import {
  Transaction,
  TransactionListData,
  TransactionType,
} from "@/models/transaction.model";
import { accountService } from "@/services/account";
import { transactionService } from "@/services/transaction";
import { transactionCategoryService } from "@/services/transaction-category";
import { TransactionsFormSchemaData } from "./_components/transactions-form";

export const getTransactionListData = async (): Promise<
  ActionResult<TransactionListData[]>
> => {
  try {
    const data = await transactionService.getListData();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const createTransaction = async (
  data: TransactionsFormSchemaData,
): Promise<ActionResult<Transaction>> => {
  try {
    const user = await checkUser();

    const type = transactionTypeEnum.enumValues.includes(
      data.type.label.toLocaleLowerCase() as TransactionType,
    )
      ? (data.type.label.toLocaleLowerCase() as TransactionType)
      : transactionTypeEnum.enumValues[0];

    const newTransaction = await transactionService.create({
      amount: data.amount.toString(),
      type: type,
      accountId: data.account.id,
      categoryId: data.category.id,
      date: data.date,
      description: data.description,
      notes: data.notes,
      userId: user.id,
    });

    return {
      success: true,
      data: newTransaction,
      message: "Transaction added",
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

export const getTransactionEditData = async (
  id: number,
): Promise<ActionResult<TransactionsFormSchemaData>> => {
  try {
    const data = await transactionService.getEditData(id);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeTransaction = async (
  id: number,
): Promise<ActionResult<Transaction>> => {
  try {
    const data = await transactionService.delete(id);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
