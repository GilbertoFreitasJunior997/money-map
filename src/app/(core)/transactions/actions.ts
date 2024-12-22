"use server";

import { SelectBaseItem } from "@/components/select-input/types";
import { transactionTypeEnum } from "@/db/schemas/transactions.schema";
import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import {
  Transaction,
  TransactionInsert,
  TransactionListData,
  TransactionType,
} from "@/models/transaction.model";
import { accountService } from "@/services/account";
import { transactionService } from "@/services/transaction";
import { transactionCategoryService } from "@/services/transaction-category";
import { DateRange } from "react-day-picker";
import { TransactionsFormSchemaData } from "./_components/transactions-form";

export const getTransactionListData = async (
  range: DateRange,
): Promise<ActionResult<TransactionListData[]>> => {
  try {
    if (!range.from || !range.to) {
      return {
        success: false,
        error: "Invalid date range",
      };
    }

    if (range.from.getTime() === range.to.getTime()) {
      range.to = new Date(range.from.getTime());
      range.to.setDate(range.to.getDate() + 1);
    }

    const data = await transactionService.getListData(range.from, range.to);

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

export const upsertTransaction = async (
  id: number | undefined,
  data: TransactionsFormSchemaData,
): Promise<ActionResult<Transaction>> => {
  try {
    const user = await checkUser();

    const type = transactionTypeEnum.enumValues.includes(
      data.type.label.toLocaleLowerCase() as TransactionType,
    )
      ? (data.type.label.toLocaleLowerCase() as TransactionType)
      : transactionTypeEnum.enumValues[0];

    const transactionInsert: TransactionInsert = {
      amount: data.amount.toString(),
      type: type,
      accountId: data.account?.id,
      categoryId: data.category?.id,
      date: new Date(data.date),
      description: data.description,
      notes: data.notes,
      userId: user.id,
    };

    const transaction = id
      ? await transactionService.update(id, transactionInsert)
      : await transactionService.create(transactionInsert);

    return {
      success: true,
      data: transaction,
      message: `Transaction ${id ? "updated" : "created"}`,
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
