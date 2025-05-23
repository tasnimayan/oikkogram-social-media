import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { getSession } from "next-auth/react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  if (!session) throw new Error("User session is not valid!");
  return {
    headers: {
      ...headers,
      authorization: session.accessToken ? `Bearer ${session.accessToken}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_HASURA_URL?.replace("https", "wss") ?? "",
    connectionParams: async () => {
      const session = await getSession();
      return {
        headers: {
          authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
        },
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const createApolloClient = () => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
