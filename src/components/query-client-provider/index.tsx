"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 min
    },
  },
});

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProviderBase client={client}>
      {children}
    </QueryClientProviderBase>
  );
};
