"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { useZodForm } from "@/lib/hooks/use-zod-form";
import { z } from "zod";
import { signUp } from "./actions";

const signUpFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
  const form = useZodForm({ schema: signUpFormSchema });

  const { mutate, isPending } = useActionMutation({
    action: signUp,
  });

  return (
    <Form
      form={form}
      onSubmit={mutate}
    >
      <div className="space-y-4">
        <Input
          form={form}
          name="name"
        />
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
          Sign up
        </Button>
      </div>
    </Form>
  );
};
