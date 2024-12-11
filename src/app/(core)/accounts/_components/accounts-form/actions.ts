"use server";

import { AuthUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { getUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { Account } from "@/models/account.model";
import { accountService } from "@/services/account";
import { accountTypeService } from "@/services/account-type";
import { revalidatePath } from "next/cache";
import { AccountsFormSchemaData } from ".";

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
