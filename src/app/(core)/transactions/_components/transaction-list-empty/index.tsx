import { Button } from "@/components/button";
import { uppercaseFirstLetter } from "@/lib/utils";
import { FilterIcon, PlusCircle, RefreshCw } from "lucide-react";
import { TransactionListEmptyProps } from "./types";

export const TransactionListEmpty = ({
  selectedFilter,
  hasTranasctions,
  onResetFilter,
  onAddTransactionClick,
}: TransactionListEmptyProps) => {
  const hasFilter = selectedFilter !== "all";

  if (hasTranasctions && hasFilter) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <FilterIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No {uppercaseFirstLetter(selectedFilter)} transactions found
        </h3>
        <p className="text-muted-foreground mb-4">
          There are no transactions matching the current filter.
        </p>
        <Button
          onClick={onResetFilter}
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <PlusCircle className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
      <p className="text-muted-foreground mb-4">
        Get started by adding your first transaction.
      </p>
      <Button onClick={onAddTransactionClick}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
    </div>
  );
};
