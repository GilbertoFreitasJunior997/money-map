import { appConfig } from "@/app-config";
import { isAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  if (await isAuthenticated()) {
    redirect(appConfig.redirectSignInURL);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-background via-background to-accent">
      {children}
    </div>
  );
}
