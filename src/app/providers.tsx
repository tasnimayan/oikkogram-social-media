"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
