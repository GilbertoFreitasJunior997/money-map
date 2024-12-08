"use server";

import { appConfig } from "@/app-config";
import { AuthUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { hashPassword } from "@/lib/password";
import { getSessionToken, getUser, setSession } from "@/lib/session";
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
      throw new AuthUserNotAuthenticatedError();
    }

    const user = await getUser();
    if (!user) {
      throw new AuthUserNotAuthenticatedError();
    }
    const { id } = user;
    const hashedPassword = await hashPassword(password);

    await userService.update(id, {
      password: hashedPassword,
    });

    await invalidateSession(token);
    await setSession(id);
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }

  redirect(appConfig.redirectSignInURL);
};
