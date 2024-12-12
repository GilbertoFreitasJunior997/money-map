"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { z } from "zod";
import { signIn } from "./actions";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export const SignInForm = () => {
  const form = useZodForm({ schema: signInFormSchema });

  const { mutate, isPending } = useActionMutation({
    action: signIn,
  });

  return (
    <Form
      form={form}
      onSubmit={mutate}
    >
      <div className="space-y-4">
        <Input
          form={form}
          name="email"
        />
        <Input
          form={form}
          name="password"
          type="password"
        />
      </div>

      <div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isPending}
        >
          Sign in
        </Button>
      </div>
    </Form>
  );
};
