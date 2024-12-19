"use server";

import { checkUser } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { Account, AccountListData } from "@/models/account.model";
import { accountService } from "@/services/account";
import { revalidatePath } from "next/cache";
import { AccountsFormSchemaData } from "./_components/accounts-form";

export const createAccount = async (
  data: AccountsFormSchemaData,
): Promise<ActionResult<Account>> => {
  try {
    const user = await checkUser();

    const newAccount = await accountService.create({
      name: data.name,
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
}: AccountListData): Promise<ActionResult> => {
  try {
    await accountService.delete(id);

    revalidatePath("/accounts");
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
