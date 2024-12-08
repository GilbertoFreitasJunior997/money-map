import { signInConfig } from "@/app/(auth)/sign-in/consts";
import { env } from "@/lib/env";
import { Google } from "arctic";

export const googleAuth = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.HOST_NAME}${signInConfig.googleRoute}/callback`,
);

export const googleAuthScopes = ["profile", "email", "openid"];
export const googleStateCookie = "google_oauth_state";
export const googleCodeCookie = "google_code_verifier";
