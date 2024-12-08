"use client";

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { SocialLoginButtons } from "../_components/social-login-buttons";
import { SignInForm } from "./sign-in-form";

export default function Page() {
  const router = useRouter();

  const handleRedirectSignUp = () => {
    router.push("sign-up");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-4">
      <h2 className="text-3xl font-extrabold text-center">
        Sign in to your account
      </h2>

      <SocialLoginButtons />

      <SignInForm />

      <div className="flex justify-end items-center text-sm">
        <p>Doesn't have an account?</p>
        <Button
          variant={"link"}
          onClick={handleRedirectSignUp}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
