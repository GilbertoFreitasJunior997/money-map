"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { useEffect } from "react";
import { z } from "zod";
import { getAccountEditData, upsertAccount } from "../../actions";
import { ACCOUNTS_FORM_ID } from "./consts";
import { AccountsFormProps } from "./types";

const accountsFormSchema = z.object({
  name: z.string().min(2),
});
export type AccountsFormSchemaData = z.infer<typeof accountsFormSchema>;

export const AccountsForm = ({
  editAccountId,
  onSuccess,
}: AccountsFormProps) => {
  const form = useZodForm({
    schema: accountsFormSchema,
  });

  const { mutate, isPending } = useActionMutation({
    action: upsertAccount,
    onSuccess: onSuccess,
    mutationKey: ["accounts"],
  });

  const { data: editAccount, isFetching: isFetchingEditAccount } =
    useActionQuery({
      action: () => getAccountEditData(editAccountId as number),
      queryKey: ["accounts", "edit", editAccountId ?? ""],
      enabled: !!editAccountId,
    });

  useEffect(() => {
    if (!editAccount || !editAccountId) {
      return;
    }

    form.reset(editAccount);
  }, [form, editAccount, editAccountId]);

  return (
    <>
      <Sheet.Body>
        <Form
          id={ACCOUNTS_FORM_ID}
          form={form}
          onSubmit={(data) => mutate(editAccountId, data)}
        >
          <Input
            name="name"
            placeholder="e.g. Debit Card"
            form={form}
            isSkeleton={isFetchingEditAccount}
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
          type="submit"
        >
          Save Account
        </Button>
      </Sheet.Footer>
    </>
  );
};
