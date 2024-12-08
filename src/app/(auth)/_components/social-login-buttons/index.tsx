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
      <div className="flex flex-col gap-4 pt-4">
        <Button
          variant="secondary"
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
          <span className="px-2 bg-background">Or</span>
        </div>
      </div>
    </>
  );
};
