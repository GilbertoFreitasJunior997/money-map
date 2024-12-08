import { requireAuth } from "@/lib/session";
import { PropsWithChildren } from "react";
import { CorePageLayout } from "./_components/core-page-layout";

export default async function AppLayout({ children }: PropsWithChildren) {
  await requireAuth();

  return <CorePageLayout> {children} </CorePageLayout>;
}
