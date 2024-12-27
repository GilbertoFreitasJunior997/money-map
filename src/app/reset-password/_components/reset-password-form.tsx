"use client";

import { appConfig } from "@/app-config";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { ArrowLeft } from "lucide-react";
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
        isLoading={isPending}
        className="w-full"
      >
        Save new password
      </Button>

      <div>
        <Link href={appConfig.redirectSignInURL}>
          <Button
            variant="ghost"
            className="px-2 gap-2 font-normal"
          >
            <Icon src={ArrowLeft} />
            <p>Go back</p>
          </Button>
        </Link>
      </div>
    </Form>
  );
};
