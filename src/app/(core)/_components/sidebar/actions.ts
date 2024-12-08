"use server";

import { sessionCookieKey } from "@/lib/consts";
import { sessionService } from "@/services/session";
import { cookies } from "next/headers";

export const signOff = async () => {
  const jar = await cookies();

  const session = jar.get(sessionCookieKey);

  if (session) {
    jar.delete(sessionCookieKey);
    sessionService.invalidateSession(session?.value);
  }
};
