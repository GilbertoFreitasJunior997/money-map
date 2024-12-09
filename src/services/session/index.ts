import { sessionsTable } from "@/db/schemas/sessions.schema";
import { Session, SessionInsert } from "@/models/session.model";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { createService } from "../_base";
import { DEFAULT_EXPIRATION_DAYS_IN_MS } from "./consts";

export const {
  create,
  getById,
  delete: deleteSession,
  update,
} = createService<Session, SessionInsert, string>(sessionsTable);

export const sessionService = {
  generateToken: () => {
    let bytes = new Uint8Array(20);
    bytes = crypto.getRandomValues(bytes);

    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
  },
  createSession: async (token: string, userId: number) => {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + DEFAULT_EXPIRATION_DAYS_IN_MS),
    };
    await create(session);

    return session;
  },
  validateToken: async (token: string) => {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );

    const session = await getById(sessionId);
    if (!session) {
      return;
    }
    const { id, expiresAt } = session;

    const currentDate = Date.now();

    if (currentDate >= expiresAt.getTime()) {
      await deleteSession(id);
      return;
    }

    if (
      currentDate >=
      expiresAt.getTime() - DEFAULT_EXPIRATION_DAYS_IN_MS / 2
    ) {
      //if there's less than 15 days (half of the default expiration), extend the active session for more 30 days
      const expiresAt = new Date(Date.now() + DEFAULT_EXPIRATION_DAYS_IN_MS);
      return await update(id, { expiresAt });
    }

    return session;
  },
  invalidateSession: async (token: string) => {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );

    await deleteSession(sessionId);
  },
};
