"use server";

import { hashPassword } from "@/lib/password";
import { setSession } from "@/lib/session";
import { ActionResult } from "@/lib/types";
import { UserAuth } from "@/models/user.model";
import { userService } from "@/services/user";
import { authGithubError, authGoogleError } from "../_lib/errors";
import { SignUpFormData } from "./sign-up-form";

export const signUp = async ({
  name,
  email,
  password,
}: SignUpFormData): Promise<ActionResult<UserAuth>> => {
  const [dbUser] = await userService.getByColumn("email", email);

  if (dbUser?.githubId) {
    return {
      success: false,
      error: authGithubError,
    };
  }

  if (dbUser?.googleId) {
    return {
      success: false,
      error: authGoogleError,
    };
  }

  if (dbUser) {
    return {
      success: false,
      error: { message: "Email already in use!" },
    };
  }

  const hashedPassword = await hashPassword(password);

  const { password: _, ...createdUser } = await userService.create({
    name,
    email,
    password: hashedPassword,
  });

  await setSession(createdUser.id);
  return {
    success: true,
    data: createdUser,
  };
};
