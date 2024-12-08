"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProviderBase client={client}>
      {children}
    </QueryClientProviderBase>
  );
};
