"use server";

import { appConfig } from "@/app-config";
import { authUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { hashPassword } from "@/lib/password";
import { checkUser, getSessionToken, setSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { sessionService } from "@/services/session";
import { userService } from "@/services/user";
import { redirect } from "next/navigation";
import { ResetPasswordFormData } from "./reset-password-form";

const { invalidateSession } = sessionService;

export const resetPassword = async ({
  password,
}: ResetPasswordFormData): Promise<ActionResult> => {
  try {
    const token = await getSessionToken();

    if (!token) {
      return {
        success: false,
        error: authUserNotAuthenticatedError,
      };
    }

    const user = await checkUser();
    const { id } = user;
    const hashedPassword = await hashPassword(password);

    await userService.update(id, {
      password: hashedPassword,
    });

    await invalidateSession(token);
    await setSession(id);
  } catch (error) {
    return {
      success: false,
      error,
    };
  }

  redirect(appConfig.redirectSignInURL);
};
