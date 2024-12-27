"use server";

import "server-only";
import { authUserNotAuthenticatedError } from "@/app/(auth)/_lib/errors";
import { sessionService } from "@/services/session";
import { userService } from "@/services/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { sessionCookieKey } from "./consts";

const { createSession, generateToken, validateToken, invalidateSession } =
  sessionService;

export const setSessionTokenCookie = async (token: string, expiresAt: Date) => {
  const jar = await cookies();

  jar.set(sessionCookieKey, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export const getSessionToken = async () => {
  const jar = await cookies();

  return jar.get(sessionCookieKey)?.value;
};

export const getSession = async () => {
  const token = await getSessionToken();
  if (!token) {
    return;
  }

  const session = await validateToken(token);
  if (!session) {
    return;
  }

  return session;
};

export const checkUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    throw new Error(authUserNotAuthenticatedError.message);
  }

  const preUser = await userService.getById(session.userId);
  if (!preUser) {
    throw new Error(authUserNotAuthenticatedError.message);
  }

  const { password: _, ...user } = preUser;
  return user;
});

export const isAuthenticated = async () => {
  const isSessionValid = await getSession();

  return !!isSessionValid;
};

export const setSession = async (userId: number) => {
  const token = generateToken();

  const session = await createSession(token, userId);

  await setSessionTokenCookie(token, session.expiresAt);
};

const deleteSessionTokenCookie = async () => {
  const jar = await cookies();

  jar.delete(sessionCookieKey);
};

export const deleteSession = async () => {
  const token = await getSessionToken();

  if (!token) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
};

export const requireAuth = async () => {
  if (!(await isAuthenticated())) {
    redirect("sign-in");
  }
};
