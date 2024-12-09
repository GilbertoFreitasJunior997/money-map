import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { transactionsTable } from "./transactions.schema";
import { usersTable } from "./users.schema";

export const quantityTypeEnum = pgEnum("quantity_type_enum", [
  "day",
  "month",
  "year",
]);

export const transactionRecurrenciesTable = pgTable(
  "transaction_recurrencies",
  {
    id: serial().primaryKey(),
    quantity: integer().notNull(),
    quantityType: quantityTypeEnum().notNull(),

    transactionId: integer("transaction_id")
      .references(() => transactionsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    userId: integer("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
);
