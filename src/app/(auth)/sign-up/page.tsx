"use client";

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { SocialLoginButtons } from "../_components/social-login-buttons";
import { SignUpForm } from "./sign-up-form";

export default function Page() {
  const router = useRouter();

  const handleRedirectSignIn = () => {
    router.push("sign-in");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-4">
      <h2 className="text-3xl font-extrabold text-center">
        Create an account for free
      </h2>

      <SocialLoginButtons />

      <SignUpForm />

      <div className="flex justify-end items-center text-sm">
        <p>Already have an account?</p>
        <Button
          variant={"link"}
          onClick={handleRedirectSignIn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
