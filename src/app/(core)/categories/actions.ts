"use server";

import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import {
  TransactionCategory,
  TransactionCategoryInsert,
  TransactionCategoryListData,
} from "@/models/transaction-category.model";
import { transactionCategoryService } from "@/services/transaction-category";
import { CategoriesFormSchemaData } from "./_components/categories-form";

export const getCategoryListData = async (): Promise<
  ActionResult<TransactionCategoryListData[]>
> => {
  try {
    const data = await transactionCategoryService.getListData();

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

export const upsertCategory = async (
  id: number | undefined,
  data: CategoriesFormSchemaData,
): Promise<ActionResult<TransactionCategory>> => {
  try {
    const user = await checkUser();

    const transactionCategoryInsert: TransactionCategoryInsert = {
      userId: user.id,
      name: data.name,
    };

    const category = id
      ? await transactionCategoryService.update(id, transactionCategoryInsert)
      : await transactionCategoryService.create(transactionCategoryInsert);

    return {
      success: true,
      data: category,
      message: `Category ${id ? "updated" : "created"}`,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const getCategoryEditData = async (
  id: number,
): Promise<ActionResult<CategoriesFormSchemaData>> => {
  try {
    const category = await transactionCategoryService.getEditData(id);

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeCategory = async (id: number): Promise<ActionResult> => {
  try {
    await transactionCategoryService.delete(id);

    return {
      success: true,
      data: undefined,
      message: "Category removed",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeCategoryBulk = async (
  ids: number[],
): Promise<ActionResult> => {
  try {
    await transactionCategoryService.deleteBulk(ids);

    const message =
      ids.length > 1 ? `${ids.length} categories removed` : "Category removed";

    return {
      success: true,
      data: undefined,
      message,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
