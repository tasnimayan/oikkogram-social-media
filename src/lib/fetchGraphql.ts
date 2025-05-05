import { VariablesOf } from "gql.tada";
import axiosInstance from "./axiosInstance";

const fetchGraphql = async <TQuery, TVariables = VariablesOf<TQuery>>(
  query: TQuery,
  variables: TVariables = {} as TVariables,
  options: Record<string, any> = {}
) => {
  const requestBody = {
    query,
    variables,
    ...options.body,
  };

  try {
    const response = await axiosInstance.post("", requestBody, { headers: options.headers });
    return response.data;
  } catch (error) {
    console.error("GraphQL request error:", error);
    throw new Error("Error making GraphQL request");
  }
};

export default fetchGraphql;

// import { GraphQLClient } from "graphql-request";
// import { TypedDocumentNode } from "gql.tada";
// import { useSession } from "next-auth/react";

// const endpoint = process.env.NEXT_PUBLIC_HASURA_URL!;

// export const getGraphQLClient = (token?: string) =>
//   new GraphQLClient(endpoint, {
//     headers: token
//       ? { Authorization: `Bearer ${token}` }
//       : {},
//   });

// export const useFetchGraphql = () => {
//   const { data: session } = useSession();

//   return async function fetchGraphql<TData, TVariables>(
//     document: TypedDocumentNode<TData, TVariables>,
//     variables?: TVariables
//   ): Promise<TData> {
//     const token = session?.accessToken ?? session?.user?.accessToken ?? undefined;
//     const client = getGraphQLClient(token);
//     return client.request(document, variables);
//   };
// };
