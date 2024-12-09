import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import { transactionsTable } from "./transactions.schema";
import { usersTable } from "./users.schema";

export const transactionInstallmentsTable = pgTable(
  "transaction_installments",
  {
    id: serial().primaryKey(),
    date: date().notNull(),
    amount: decimal().notNull(),
    isPaid: boolean("is_paid").notNull(),
    currentInstallmentNumber: integer("current_installment_number").notNull(),

    transactionId: integer("transaction_id").references(
      () => transactionsTable.id,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    ),
    userId: integer("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
);
