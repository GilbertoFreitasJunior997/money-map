import { signInConfig } from "@/app/(auth)/sign-in/consts";
import { env } from "@/lib/env";
import { GitHub } from "arctic";

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  `${env.HOST_NAME}${signInConfig.githubRoute}/callback`,
);

export const githubAuthScopes = ["user:email"];
export const githubStateCookie = "github_oauth_state";
