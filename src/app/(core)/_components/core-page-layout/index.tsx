import { PropsWithChildren } from "react";
import { Sidebar } from "../sidebar";
import { UserNav } from "../sidebar/user-nav";
import { PageTitle } from "./page-title";

export const CorePageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-dvh flex p-4 pr-0 gap-9">
      <Sidebar UserNav={<UserNav />} />

      <div className="flex flex-col w-full overflow-auto pr-4">
        <PageTitle />

        {children}
      </div>
    </div>
  );
};
