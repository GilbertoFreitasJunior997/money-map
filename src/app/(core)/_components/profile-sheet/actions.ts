"use server";

import { authUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { getSessionToken, setSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { UserAuth } from "@/models/user.model";
import { sessionService } from "@/services/session";
import { userService } from "@/services/user";

const { invalidateSession } = sessionService;

export const updateProfile = async ({
  id,
  name,
}: UserAuth): Promise<ActionResult> => {
  try {
    const token = await getSessionToken();
    if (!token) {
      return {
        success: false,
        error: authUserNotAuthenticatedError,
      };
    }

    await userService.update(id, {
      name,
    });

    await invalidateSession(token);
    await setSession(id);

    return {
      success: true,
      data: undefined,
      message: "Profile updated",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
