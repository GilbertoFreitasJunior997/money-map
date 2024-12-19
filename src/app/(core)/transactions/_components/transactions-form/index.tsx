"use client";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { NumberInput } from "@/components/number-input";
import { SelectInput } from "@/components/select-input";
import { selectBaseItemSchema } from "@/components/select-input/consts";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { useState } from "react";
import { z } from "zod";
import {
  createTransaction,
  getTransactionFormAccounts,
  getTransactionFormTransactionCategories,
} from "../../actions";
import { TRANSACTIONS_FORM_ID, transactionsFormTypeItems } from "./consts";
import { TransactionsFormProps } from "./types";

const transactionsFormSchema = z.object({
  description: z.string(),
  notes: z.string(),
  amount: z.number(),
  type: selectBaseItemSchema,
  date: z.date(),
  account: selectBaseItemSchema,
  category: selectBaseItemSchema,
});
export type TransactionsFormSchemaData = z.infer<typeof transactionsFormSchema>;

export const TransactionsForm = ({ onClose }: TransactionsFormProps) => {
  const form = useZodForm({
    schema: transactionsFormSchema,
    defaultValues: {
      type: transactionsFormTypeItems[0],
    },
  });

  const { mutate, isPending } = useActionMutation({
    action: createTransaction,
    onSuccess: onClose,
  });

  const { data: categories, isLoading: isLoadingCategories } = useActionQuery({
    action: getTransactionFormTransactionCategories,
    queryKey: ["transactionCategories"],
  });

  const { data: accounts, isLoading: isLoadingAccounts } = useActionQuery({
    action: getTransactionFormAccounts,
    queryKey: ["accounts"],
  });

  const [date, setDate] = useState<Date>();

  return (
    <>
      <Sheet.Body>
        <Form
          id={TRANSACTIONS_FORM_ID}
          form={form}
          onSubmit={mutate}
        >
          <SelectInput
            name="type"
            form={form}
            items={transactionsFormTypeItems}
          />
          <NumberInput
            name="amount"
            form={form}
          />
          <DatePicker
            value={date}
            onChange={setDate}
          />
          <Input
            name="description"
            form={form}
          />
          <SelectInput
            name="category"
            form={form}
            items={categories ?? []}
            isLoading={isLoadingCategories}
          />
          <SelectInput
            name="account"
            form={form}
            items={accounts ?? []}
            isLoading={isLoadingAccounts}
          />
          <Input
            name="notes"
            form={form}
          />
        </Form>
      </Sheet.Body>
      <Sheet.Footer>
        <Sheet.Close asChild>
          <Button
            disabled={isPending}
            variant="secondary"
          >
            Cancel
          </Button>
        </Sheet.Close>
        <Button
          isLoading={isPending}
          form={TRANSACTIONS_FORM_ID}
        >
          Create Account
        </Button>
      </Sheet.Footer>
    </>
  );
};
