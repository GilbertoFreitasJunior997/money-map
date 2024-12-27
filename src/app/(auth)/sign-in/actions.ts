"use server";

import { verifyPasswordHash } from "@/lib/password";
import { setSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { UserAuth } from "@/models/user.model";
import { userService } from "@/services/user";
import {
  authGithubError,
  authGoogleError,
  authInvalidDataError,
} from "../_lib/errors";
import { SignInFormData } from "./sign-in-form";

export const signIn = async ({
  email,
  password,
}: SignInFormData): Promise<ActionResult<UserAuth>> => {
  const [dbUser] = await userService.getByColumn("email", email);

  if (!dbUser) {
    return {
      success: false,
      error: authInvalidDataError,
    };
  }

  if (dbUser.githubId) {
    return {
      success: false,
      error: authGithubError,
    };
  }

  if (dbUser.googleId) {
    return {
      success: false,
      error: authGoogleError,
    };
  }

  if (!dbUser.password) {
    return {
      success: false,
      error: authInvalidDataError,
    };
  }

  const passwordMatches = await verifyPasswordHash(dbUser.password, password);

  if (!passwordMatches) {
    return {
      success: false,
      error: authInvalidDataError,
    };
  }

  const { password: _, ...user } = dbUser;

  await setSession(user.id);
  return { success: true, data: user };
};
