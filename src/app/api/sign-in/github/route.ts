import {
  github,
  githubAuthScopes,
  githubStateCookie,
} from "@/services/github/consts";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();

  const url = github.createAuthorizationURL(state, githubAuthScopes);

  const jar = await cookies();
  jar.set(githubStateCookie, state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
