"use client";

import { useViewportHeight } from "@/lib/hooks/useViewportHeight";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // used for dynamic height calculation for mobile devices
  useViewportHeight();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        // retry: 1,
      },
      // mutations: {
      //   retry: 1,
      // },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
