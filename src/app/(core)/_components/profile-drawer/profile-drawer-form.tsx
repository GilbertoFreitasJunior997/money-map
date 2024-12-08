"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet } from "@/components/sheet";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { UserAuth } from "@/models/user.model";
import Link from "next/link";
import { z } from "zod";
import { updateProfile } from "./actions";
import { PROFILE_DRAWER_FORM_ID } from "./consts";

const formSchema = z.object({
  name: z.string(),
  email: z.string().readonly(),
});
export type ProfileFormData = z.infer<typeof formSchema>;

export const ProfileDrawerForm = ({ user }: { user: UserAuth }) => {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { mutateAsync: mutate, isPending } = useActionMutation({
    action: updateProfile,
  });

  const handleFormSubmit = async ({ name }: ProfileFormData) => {
    await mutate({ ...user, name });
  };

  return (
    <>
      <Sheet.Body className="space-y-6">
        <Form
          form={form}
          onSubmit={handleFormSubmit}
          id={PROFILE_DRAWER_FORM_ID}
        >
          <Input
            form={form}
            name="name"
          />
          <Input
            form={form}
            name="email"
            disabled={true}
            readOnly={true}
          />
        </Form>

        <div className="flex w-full justify-end items-center">
          <Link
            href="reset-password"
            className="mt-4"
          >
            <Button variant="link">Reset Password</Button>
          </Link>
        </div>
      </Sheet.Body>

      <Sheet.Footer>
        <Sheet.Close asChild>
          <Button
            disabled={isPending}
            variant="outline"
          >
            Cancel
          </Button>
        </Sheet.Close>

        <Button
          disabled={isPending}
          form={PROFILE_DRAWER_FORM_ID}
        >
          Save
        </Button>
      </Sheet.Footer>
    </>
  );
};
