"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { NumberInput } from "@/components/number-input";
import { SelectInput } from "@/components/select-input";
import { selectBaseItemSchema } from "@/components/select-input/consts";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { createAccount, getAccountSelectData } from "../../actions";
import { ACCOUNTS_FORM_ID } from "./consts";
import { AccountsFormProps } from "./types";

const accountsFormSchema = z.object({
  name: z.string().min(2),
  balance: z.number(),
  accountType: selectBaseItemSchema,
});
export type AccountsFormSchemaData = z.infer<typeof accountsFormSchema>;

export const AccountsForm = ({ onClose }: AccountsFormProps) => {
  const form = useZodForm({
    schema: accountsFormSchema,
  });
  const { mutate, isPending } = useActionMutation({
    action: createAccount,
    onSuccess: async () => {
      onClose();
    },
  });

  const { data: accountTypes } = useQuery({
    queryKey: ["accountTypes", "select"],
    queryFn: getAccountSelectData,
    initialData: [],
  });

  return (
    <>
      <Sheet.Body>
        <Form
          id={ACCOUNTS_FORM_ID}
          form={form}
          onSubmit={mutate}
        >
          <Input
            name="name"
            form={form}
          />
          <NumberInput
            name="balance"
            form={form}
          />
          <SelectInput
            name="accountType"
            form={form}
            items={accountTypes}
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
          disabled={isPending}
          form={ACCOUNTS_FORM_ID}
        >
          Create Account
        </Button>
      </Sheet.Footer>
    </>
  );
};
