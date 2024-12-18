"use server";

import { AuthUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { getUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { AccountType } from "@/models/account-type.model";
import { Account, AccountTableData } from "@/models/account.model";
import { accountService } from "@/services/account";
import { accountTypeService } from "@/services/account-type";
import { revalidatePath } from "next/cache";
import { AccountTypesFormSchemaData } from "./_components/account-types-form";
import { AccountsFormSchemaData } from "./_components/accounts-form";

export const getAccountSelectData = async () => {
  return await accountTypeService.getSelectData();
};

export const createAccount = async (
  data: AccountsFormSchemaData,
): Promise<ActionResult<Account>> => {
  try {
    const user = await getUser();
    if (!user) {
      throw new AuthUserNotAuthenticatedError();
    }

    const newAccount = await accountService.create({
      name: data.name,
      balance: data.balance.toString(),
      accountTypeId: data.accountType.id,
      userId: user.id,
    });

    revalidatePath("/accounts");
    return {
      success: true,
      data: newAccount,
      message: "Account created",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeAccount = async ({
  id,
}: AccountTableData): Promise<ActionResult> => {
  try {
    await accountService.delete(id);

    revalidatePath("/accounts");
    return {
      success: true,
      data: undefined,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};

export const createAccountType = async (
  data: AccountTypesFormSchemaData,
): Promise<ActionResult<AccountType>> => {
  try {
    const user = await getUser();
    if (!user) {
      throw new AuthUserNotAuthenticatedError();
    }

    const newAccountType = await accountTypeService.create({
      description: data.description,
      observation: data.observation,
      userId: user.id,
    });

    return {
      success: true,
      data: newAccountType,
      message: "Account type created",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const removeAccountType = async (
  id: number,
): Promise<ActionResult<number>> => {
  try {
    const user = await getUser();
    if (!user) {
      throw new AuthUserNotAuthenticatedError();
    }

    const hasConnectedAccount =
      await accountTypeService.getHasConnectedAccount(id);
    if (hasConnectedAccount) {
      throw new Error(
        "This account type is vinculated to an account. Delete the connected account before deleting this account type.",
      );
    }

    await accountTypeService.delete(id);

    return {
      success: true,
      data: id,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const getAccountType = async (
  id: number,
): Promise<ActionResult<AccountType>> => {
  try {
    const accountType = await accountTypeService.getById(id);
    if (!accountType) {
      throw new Error("Account type not found!");
    }

    return {
      success: true,
      data: accountType,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
