"use server";

import { verifyPasswordHash } from "@/lib/password";
import { setSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { UserAuth } from "@/models/user.model";
import { userService } from "@/services/user";
import {
  AuthGithubError,
  AuthGoogleError,
  AuthInvalidDataError,
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
      error: new AuthInvalidDataError(),
    };
  }

  if (dbUser.githubId) {
    return {
      success: false,
      error: new AuthGithubError(),
    };
  }

  if (dbUser.googleId) {
    return {
      success: false,
      error: new AuthGoogleError(),
    };
  }

  if (!dbUser.password) {
    return {
      success: false,
      error: new AuthInvalidDataError(),
    };
  }

  const passwordMatches = await verifyPasswordHash(dbUser.password, password);

  if (!passwordMatches) {
    return {
      success: false,
      error: new AuthInvalidDataError(),
    };
  }

  const { password: _, ...user } = dbUser;

  await setSession(user.id);
  return { success: true, data: user };
};
