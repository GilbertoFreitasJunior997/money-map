"use client";

import { Button } from "@/components/button";
import { DateInput } from "@/components/date-input";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { NumberInput } from "@/components/number-input";
import { SelectInput } from "@/components/select-input";
import { selectBaseItemSchema } from "@/components/select-input/consts";
import { Sheet } from "@/components/sheet";
import { TextAreaInput } from "@/components/textarea-input";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import {
  getTransactionEditData,
  getTransactionFormAccounts,
  getTransactionFormTransactionCategories,
  upsertTransaction,
} from "../../actions";
import { TRANSACTIONS_FORM_ID, transactionsFormTypeItems } from "./consts";
import { TransactionsFormProps } from "./types";

const transactionsFormSchema = z.object({
  description: z.string().nullable(),
  notes: z.string().nullable(),
  amount: z.number(),
  type: selectBaseItemSchema,
  date: z.date(),
  account: selectBaseItemSchema,
  category: selectBaseItemSchema,
});
export type TransactionsFormSchemaData = z.infer<typeof transactionsFormSchema>;

export const TransactionsForm = ({
  editTransactionId,
  onClose,
}: TransactionsFormProps) => {
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: transactionsFormSchema,
    defaultValues: editTransactionId
      ? undefined
      : {
          type: transactionsFormTypeItems[0],
          date: new Date(),
        },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["transactions"],
      exact: false,
    });

    onClose();
  };

  const { mutate, isPending } = useActionMutation({
    action: upsertTransaction,
    onSuccess: handleSuccess,
  });

  const { data: editTransaction, isFetching: isFetchingEditTransaction } =
    useActionQuery({
      action: () => getTransactionEditData(editTransactionId as number),
      queryKey: ["transactions", editTransactionId ?? ""],
      enabled: !!editTransactionId,
    });

  useEffect(() => {
    if (!editTransaction || !editTransactionId) {
      return;
    }

    form.reset(editTransaction);
  }, [form, editTransaction, editTransactionId]);

  const { data: categories, isLoading: isLoadingCategories } = useActionQuery({
    action: getTransactionFormTransactionCategories,
    queryKey: ["transactionCategories"],
  });

  const { data: accounts, isLoading: isLoadingAccounts } = useActionQuery({
    action: getTransactionFormAccounts,
    queryKey: ["accounts"],
  });

  return (
    <>
      <Sheet.Body>
        <Form
          id={TRANSACTIONS_FORM_ID}
          form={form}
          onSubmit={(data) => mutate(editTransactionId, data)}
        >
          <SelectInput
            name="type"
            form={form}
            isSkeleton={isFetchingEditTransaction}
            items={transactionsFormTypeItems}
          />
          <NumberInput
            name="amount"
            form={form}
            isSkeleton={isFetchingEditTransaction}
            isCurrency={true}
            min={0.01}
          />
          <DateInput
            name="date"
            form={form}
            isSkeleton={isFetchingEditTransaction}
          />
          <Input
            name="description"
            form={form}
            isSkeleton={isFetchingEditTransaction}
          />
          <SelectInput
            name="category"
            form={form}
            isSkeleton={isFetchingEditTransaction}
            items={categories ?? []}
            isLoading={isLoadingCategories}
          />
          <SelectInput
            name="account"
            form={form}
            isSkeleton={isFetchingEditTransaction}
            items={accounts ?? []}
            isLoading={isLoadingAccounts}
          />
          <TextAreaInput
            name="notes"
            form={form}
            isSkeleton={isFetchingEditTransaction}
          />
        </Form>
      </Sheet.Body>

      <Sheet.Footer isLoading={isFetchingEditTransaction}>
        <Sheet.Close asChild>
          <Button
            disabled={isPending}
            variant="secondary"
          >
            Cancel
          </Button>
        </Sheet.Close>

        <Button
          type="submit"
          isLoading={isPending}
          form={TRANSACTIONS_FORM_ID}
        >
          {editTransactionId ? "Update" : "Create"} Transaction
        </Button>
      </Sheet.Footer>
    </>
  );
};
