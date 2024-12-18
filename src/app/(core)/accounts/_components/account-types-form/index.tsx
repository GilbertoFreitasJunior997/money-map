"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createAccountType } from "../../actions";
import { ACCOUNT_TYPES_FORM_ID } from "./consts";
import { AccountTypesFormProps } from "./types";

const accountTypesFormSchema = z.object({
  description: z.string(),
  observation: z.string().optional(),
});

export type AccountTypesFormSchemaData = z.infer<typeof accountTypesFormSchema>;

export const AccountTypesForm = ({
  updateData,
  onClose,
}: AccountTypesFormProps) => {
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: accountTypesFormSchema,
    defaultValues: updateData
      ? {
          description: updateData.description,
          observation: updateData.observation || "",
        }
      : undefined,
  });

  const { mutate, isPending } = useActionMutation({
    action: createAccountType,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["accountTypes"],
      });

      onClose();
    },
  });

  return (
    <>
      <Sheet.Body>
        <Form
          id={ACCOUNT_TYPES_FORM_ID}
          form={form}
          onSubmit={mutate}
        >
          <Input
            name="description"
            form={form}
          />
          <Input
            name="observation"
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
          form={ACCOUNT_TYPES_FORM_ID}
        >
          Create Account Type
        </Button>
      </Sheet.Footer>
    </>
  );
};
