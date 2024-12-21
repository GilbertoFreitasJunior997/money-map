import { integer, serial, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";

export const id = () => serial().primaryKey();
export const userId = () =>
  integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull();

export const createdAt = () => timestamp("created_at").notNull().defaultNow();
export const updatedAt = () =>
  timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());
