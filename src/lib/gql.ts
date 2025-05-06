import { initGraphQLTada } from "gql.tada";
import { introspection } from "graphql-env";

export const gql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    timestamptz: Date | string;
    timestamp: Date | string;
    bigint: number;
    uuid: string;
  };
}>();
