"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { z } from "zod";
import { createAccount } from "../../actions";
import { ACCOUNTS_FORM_ID } from "./consts";
import { AccountsFormProps } from "./types";
import { TextAreaInput } from "@/components/textarea-input";

const accountsFormSchema = z.object({
  name: z.string().min(2),
  notes: z.string().min(2),
});
export type AccountsFormSchemaData = z.infer<typeof accountsFormSchema>;

export const AccountsForm = ({ onClose }: AccountsFormProps) => {
  const form = useZodForm({
    schema: accountsFormSchema,
  });

  const { mutate, isPending } = useActionMutation({
    action: createAccount,
    onSuccess: onClose,
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
          <TextAreaInput
            name="notes"
            form={form}
            isCurrency={true}
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
    </>
  );
};
