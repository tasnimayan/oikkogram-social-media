// hooks/useGraphqlSubscription.ts
import { useEffect, useRef } from "react";
import { createClient, Client, SubscribePayload } from "graphql-ws";
import { Variables } from "graphql-request";

import { getSession } from "next-auth/react";

let client: Client | null = null;

export const getGraphQLWSClient = () => {
  if (!client && typeof window !== "undefined") {
    client = createClient({
      url: process.env.NEXT_PUBLIC_HASURA_URL?.replace("https", "wss") ?? "",
      connectionParams: async () => {
        const session = await getSession();
        return {
          headers: {
            authorization: session?.token ? `Bearer ${session.token}` : "",
          },
        };
      },
    });
  }
  return client!;
};

export function useGqlSubscription<TData, TVariables extends Variables>(
  payload: SubscribePayload,
  onNext: (data: TData) => void
) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = getGraphQLWSClient();
    clientRef.current = client;

    const dispose = client.subscribe<TData>(payload, {
      next: ({ data }) => {
        if (data) {
          onNext(data);
        }
      },
      error: err => console.error("Subscription error", err),
      complete: () => console.log("Subscription completed"),
    });

    return () => {
      dispose();
    };
  }, [payload.query]);
}
