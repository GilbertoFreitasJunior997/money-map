"use client";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Separator } from "@/components/separator";
import { Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInConfig } from "../../sign-in/consts";

export const SocialLoginButtons = () => {
  const router = useRouter();

  const handleRedirectGithub = () => {
    router.push(signInConfig.githubRoute);
  };
  const handleRedirectGoogle = () => {
    router.push(signInConfig.googleRoute);
  };

  return (
    <>
      <div className="w-full border-sky-600 dark:border-sky-400  bg-sky-400/20 dark:bg-sky-400/20 border rounded-md py-1 px-2 text-sm text-sky-600 dark:text-sky-400 mt-4">
        Try it out! We'll pre-fill some example data to help you explore
      </div>

      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleRedirectGithub}
        >
          <Icon src={Github} />
          Continue with GitHub
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          onClick={handleRedirectGoogle}
        >
          <Icon src={Mail} />
          Continue with Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background rounded-full">Or</span>
        </div>
      </div>
    </>
  );
};
