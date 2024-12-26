import { TransactionListData } from "@/models/transaction.model";

export const sumTransactionsValues = (
  transactions: TransactionListData[],
  condition?: (transaction: TransactionListData) => boolean,
) => {
  let total = 0;
  let income = 0;
  let expenses = 0;
  let transfers = 0;

  for (const transaction of transactions) {
    const isValidTransaction = condition ? condition(transaction) : true;
    if (!isValidTransaction) {
      continue;
    }

    const amount = Number.parseFloat(transaction.amount);

    switch (transaction.type) {
      case "income": {
        income += amount;
        total += amount;
        break;
      }
      case "expense": {
        expenses += amount;
        total -= amount;
        break;
      }
      case "transfer": {
        transfers += amount;
        break;
      }
      default: {
        break;
      }
    }
  }

  return {
    total,
    income,
    expenses,
    transfers,
  };
};
