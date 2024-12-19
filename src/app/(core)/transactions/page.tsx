import { transactionService } from "@/services/transaction";
import { SummaryCardList } from "./_components/summary-card-list";
import { TransactionList } from "./_components/transaction-list";

export default async function Page() {
  const transactions = await transactionService.getListData();

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-3xl font-bold">Financial Overview</h1>

      <SummaryCardList />

      <div className="bg-card text-card-foreground shadow-md rounded-lg py-6 px-6 md:px-32">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
