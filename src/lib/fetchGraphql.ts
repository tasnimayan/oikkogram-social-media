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
