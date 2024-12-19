"use client";

import { Button } from "@/components/button";
import { uppercaseFirstLetter } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionItem } from "../transaction-item";
import { TransactionSheet } from "../transaction-sheet";
import { transactionListFilters } from "./consts";
import { TransactionListFilter, TransactionListProps } from "./types";

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] =
    useState<TransactionListFilter>("all");

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === "all") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.type === selectedFilter,
    );
  }, [transactions, selectedFilter]);

  // const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
  //   // In a real application, you would add the new transaction to your data store
  //   setIsSheetOpen(false);
  // };

  // const handleEditTransaction = (
  //   updatedTransaction: Omit<Transaction, "id">,
  // ) => {
  //   // In a real application, you would update the transaction in your data store
  //   setIsSheetOpen(false);
  // };

  // const handleDeleteTransaction = () => {
  //   if (deletingTransaction) {
  //     // In a real application, you would delete the transaction from your data store
  //     setDeletingTransaction(undefined);
  //   }
  // };

  // const openAddSheet = () => {
  //   setEditingTransaction(undefined);
  //   setIsSheetOpen(true);
  // };

  // const openEditSheet = (transaction: Transaction) => {
  //   setEditingTransaction(transaction);
  //   setIsSheetOpen(true);
  // };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {transactionListFilters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              variant={filter === selectedFilter ? "default" : "outline"}
              size="sm"
            >
              {uppercaseFirstLetter(filter)}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setIsSheetOpen(true)}
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </div>
      <div className="space-y-2">
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            // onEdit={() => openEditSheet(transaction)}
            // onDelete={() => setDeletingTransaction(transaction)}
          />
        ))}
      </div>
      <TransactionSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
      />
      {/* <AlertDialog
        open={!!deletingTransaction}
        onOpenChange={() => setDeletingTransaction(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this transaction?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTransaction}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};
