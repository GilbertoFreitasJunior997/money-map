import { appConfig } from "@/app-config";
import { Logo } from "@/components/logo";
import { requireAuth } from "@/lib/session";
import Link from "next/link";
import { ResetPasswordForm } from "./_components/reset-password-form";

export default async function Page() {
  await requireAuth();

  return (
    <div className="h-dvh flex flex-col px-10 lg:px-60 py-10 bg-gradient-to-t from-background via-background to-accent">
      <Link href={appConfig.redirectSignInURL}>
        <Logo />
      </Link>

      <div className="grid place-content-center pt-[250px] gap-8">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Reset your password
          </h1>
          <p className="text-sm text-foreground/70 font-semibold">
            Type in a new secure password and press save to update your password
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
