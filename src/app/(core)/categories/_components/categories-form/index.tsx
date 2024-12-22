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
import { getCategoryEditData, upsertCategory } from "../../actions";
import { CATEGORIES_FORM_ID } from "./consts";
import { CategoriesFormProps } from "./types";

const categoriesFormSchema = z.object({
  name: z.string().min(2),
});
export type CategoriesFormSchemaData = z.infer<typeof categoriesFormSchema>;

export const CategoriesForm = ({
  editCategoryId,
  onSuccess,
}: CategoriesFormProps) => {
  const form = useZodForm({
    schema: categoriesFormSchema,
  });

  const { mutate, isPending } = useActionMutation({
    action: upsertCategory,
    onSuccess: onSuccess,
    mutationKey: ["categories"],
  });

  const { data: editCategory, isFetching: isFetchingEditCategory } =
    useActionQuery({
      action: () => getCategoryEditData(editCategoryId as number),
      queryKey: ["categories", "edit", editCategoryId ?? ""],
      enabled: !!editCategoryId,
    });

  useEffect(() => {
    if (!editCategory || !editCategoryId) {
      return;
    }

    form.reset(editCategory);
  }, [form, editCategory, editCategoryId]);

  return (
    <>
      <Sheet.Body>
        <Form
          id={CATEGORIES_FORM_ID}
          form={form}
          onSubmit={(data) => mutate(editCategoryId, data)}
        >
          <Input
            name="name"
            placeholder="e.g. Groceries"
            form={form}
            isSkeleton={isFetchingEditCategory}
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
          form={CATEGORIES_FORM_ID}
        >
          Save Category
        </Button>
      </Sheet.Footer>
    </>
  );
};
