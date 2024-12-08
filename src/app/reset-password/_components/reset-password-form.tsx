"use client";

import { appConfig } from "@/app-config";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import Link from "next/link";
import { z } from "zod";
import { resetPassword } from "./actions";

const resetPasswordFormSchema = z.object({
  password: z.string().min(6),
});
export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export const ResetPasswordForm = () => {
  const form = useZodForm({
    schema: resetPasswordFormSchema,
  });

  const { mutate, isPending } = useActionMutation({
    action: resetPassword,
    throwOnUndefined: false,
  });

  return (
    <Form
      form={form}
      onSubmit={mutate}
      className="space-y-4"
    >
      <Input
        name={"password"}
        form={form}
        type="password"
      />

      <Separator />

      <Button
        disabled={isPending}
        className="w-full"
      >
        Save new password
      </Button>

      <div>
        <Link
          href={appConfig.redirectSignInURL}
          className="font-semibold text-sm border-b border-transparent hover:border-foreground transition-colors"
        >
          Go back
        </Link>
      </div>
    </Form>
  );
};
