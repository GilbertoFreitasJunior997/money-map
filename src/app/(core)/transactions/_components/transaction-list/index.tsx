"use client";

import { Button } from "@/components/button";
import { uppercaseFirstLetter } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionItem } from "../transaction-item";
import { TransactionListEmpty } from "../transaction-list-empty";
import { TransactionListLayout } from "../transaction-list-layout";
import { TransactionRemoveDialog } from "../transaction-remove-dialog";
import { TransactionSheet } from "../transaction-sheet";
import { transactionListFilters } from "./consts";
import { TransactionListFilter, TransactionListProps } from "./types";

export const TransactionList = ({
  transactions,
  isFetching,
}: TransactionListProps) => {
  const queryClient = useQueryClient();
  const isMutating = !!queryClient.isMutating({
    mutationKey: ["transactions"],
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [removeTransactionId, setRemoveTransactionId] = useState<number>();
  const [editTransactionId, setEditTransactionId] = useState<number>();
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

  const handleOpenCreateSheet = () => {
    setIsSheetOpen(true);
  };

  const handleOpenEditSheet = (transactionId: number) => {
    setEditTransactionId(transactionId);
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setEditTransactionId(undefined);
    }

    setIsSheetOpen(isOpen);
  };

  const handleOpenRemoveDialog = (id: number) => {
    setRemoveTransactionId(id);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveTransactionId(undefined);
  };

  const handleResetFilter = () => {
    setSelectedFilter("all");
  };

  const areButtonsDisabled = isFetching || isMutating;

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
            onClick={handleOpenCreateSheet}
            size="sm"
            disabled={areButtonsDisabled}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        }
        list={
          filteredTransactions.length ? (
            filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onRemoveClick={() => handleOpenRemoveDialog(transaction.id)}
                onEditClick={() => handleOpenEditSheet(transaction.id)}
                areButtonsDisabled={areButtonsDisabled}
              />
            ))
          ) : (
            <TransactionListEmpty
              selectedFilter={selectedFilter}
              hasTranasctions={!!transactions?.length}
              onResetFilter={handleResetFilter}
              onAddTransactionClick={handleOpenCreateSheet}
            />
          )
        }
      />

      <TransactionSheet
        isOpen={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
        editTransactionId={editTransactionId}
      />

      <TransactionRemoveDialog
        transactionId={removeTransactionId}
        onClose={handleCloseRemoveDialog}
      />
    </>
  );
};
