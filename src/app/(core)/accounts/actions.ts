"use server";

import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import {
  Account,
  AccountInsert,
  AccountListData,
} from "@/models/account.model";
import { accountService } from "@/services/account";
import { AccountsFormSchemaData } from "./_components/accounts-form";

export const getAccountListData = async (): Promise<
  ActionResult<AccountListData[]>
> => {
  try {
    const data = await accountService.getListData();

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

export const upsertAccount = async (
  id: number | undefined,
  data: AccountsFormSchemaData,
): Promise<ActionResult<Account>> => {
  try {
    const user = await checkUser();

    const accountInsert: AccountInsert = {
      name: data.name,
      userId: user.id,
    };

    const account = id
      ? await accountService.update(id, accountInsert)
      : await accountService.create(accountInsert);

    return {
      success: true,
      data: account,
      message: `Account ${id ? "updated" : "created"}`,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const getAccountEditData = async (
  id: number,
): Promise<ActionResult<AccountsFormSchemaData>> => {
  try {
    const account = await accountService.getEditData(id);

    return {
      success: true,
      data: account,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeAccount = async (id: number): Promise<ActionResult> => {
  try {
    await accountService.delete(id);

    return {
      success: true,
      data: undefined,
      message: "Account removed",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeAccountBulk = async (
  ids: number[],
): Promise<ActionResult> => {
  try {
    await accountService.deleteBulk(ids);

    const message =
      ids.length > 1 ? `${ids.length} accounts removed` : "Account removed";

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
