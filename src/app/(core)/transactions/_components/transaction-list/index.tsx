"use client";

import { Button } from "@/components/button";
import { uppercaseFirstLetter } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionItem } from "../transaction-item";
import { TransactionListLayout } from "../transaction-list-layout";
import { TransactionRemoveDialog } from "../transaction-remove-dialog";
import { TransactionSheet } from "../transaction-sheet";
import { transactionListFilters } from "./consts";
import { TransactionListFilter, TransactionListProps } from "./types";

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [removeTransactionId, setRemoveTransactionId] = useState<number>();
  const [selectedFilter, setSelectedFilter] =
    useState<TransactionListFilter>("all");

  const filteredTransactions = useMemo(() => {
    if (!transactions) {
      return [];
    }

    if (selectedFilter === "all") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.type === selectedFilter,
    );
  }, [transactions, selectedFilter]);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleOpenRemoveDialog = (id: number) => {
    setRemoveTransactionId(id);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveTransactionId(undefined);
  };

  return (
    <>
      <TransactionListLayout
        leftToolbarItems={transactionListFilters.map((filter) => (
          <Button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            variant={filter === selectedFilter ? "default" : "outline"}
            size="sm"
          >
            {uppercaseFirstLetter(filter)}
          </Button>
        ))}
        rightToolbarItems={
          <Button
            onClick={handleOpenSheet}
            size="sm"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        }
        list={filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onRemoveClick={handleOpenRemoveDialog}
            // onEdit={() => openEditSheet(transaction)}
          />
        ))}
      />
      <TransactionSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
      <TransactionRemoveDialog
        transactionId={removeTransactionId}
        onClose={handleCloseRemoveDialog}
      />
    </>
  );
};
