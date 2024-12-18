"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { NumberInput } from "@/components/number-input";
import { selectBaseItemSchema } from "@/components/select-input/consts";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { AccountType } from "@/models/account-type.model";
import { useState } from "react";
import { z } from "zod";
import { createAccount } from "../../actions";
import { AccountTypeSelect } from "../account-type-select";
import { AccountTypesRegisterSheet } from "../account-types-register-sheet";
import { ACCOUNTS_FORM_ID } from "./consts";
import { AccountsFormProps } from "./types";

const accountsFormSchema = z.object({
  name: z.string().min(2),
  balance: z.number(),
  accountType: selectBaseItemSchema,
});
export type AccountsFormSchemaData = z.infer<typeof accountsFormSchema>;

export const AccountsForm = ({ onClose }: AccountsFormProps) => {
  const [isAccountTypeSheetOpen, setIsAccountTypeSheetOpen] = useState(false);
  const [accountTypeUpdateData, setAccountTypeUpdateData] =
    useState<AccountType>();

  const form = useZodForm({
    schema: accountsFormSchema,
  });

  const { mutate, isPending } = useActionMutation({
    action: createAccount,
    onSuccess: async () => {
      onClose();
    },
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

          <AccountTypeSelect
            form={form}
            setIsAccountTypeSheetOpen={setIsAccountTypeSheetOpen}
            setAccountTypeUpdateData={setAccountTypeUpdateData}
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
          form={ACCOUNTS_FORM_ID}
        >
          Create Account
        </Button>
      </Sheet.Footer>

      <AccountTypesRegisterSheet
        isOpen={isAccountTypeSheetOpen}
        setIsOpen={setIsAccountTypeSheetOpen}
        updateData={accountTypeUpdateData}
        setAccountTypeUpdateData={setAccountTypeUpdateData}
      />
    </>
  );
};
