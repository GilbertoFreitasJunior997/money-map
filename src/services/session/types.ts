import { Session } from "@/models/session.model";
import { User } from "@/models/user.model";

type SessionValidated = { session: Session; user: User };
type SessionNotValidated = { session: null; user: null };

export type SessionValidationResult = SessionValidated | SessionNotValidated;
