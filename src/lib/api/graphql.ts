import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import request, { RequestDocument, RequestExtendedOptions, Variables } from "graphql-request";
import { getSession } from "next-auth/react";

const ENDPOINT = process.env.NEXT_PUBLIC_HASURA_URL!;

export async function useFetchGql<TData, TVariables extends Variables>(
  query: RequestDocument | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
): Promise<TData> {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  if (!ENDPOINT) {
    throw new Error("GraphQL endpoint is not defined in the environment variables.");
  }

  const requestHeaders = { authorization: `Bearer ${session.token}` };
  const options: RequestExtendedOptions = {
    url: String(ENDPOINT),
    document: query,
    requestHeaders,
    variables,
  };

  return request(options as RequestExtendedOptions<TVariables, TData>);
}
