import axios from "axios";
import { getSession } from "next-auth/react";
const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFzbmltIEF5YW4iLCJlbWFpbCI6InRhc25pbWF5YW4yMkBnbWFpbC5jb20iLCJwaWN0dXJlIjpudWxsLCJzdWIiOiJhYzA1YzJmOS0yZGY3LTQ4YzEtOGYwNi0xZWY3YWI0MTk4NzYiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiYWMwNWMyZjktMmRmNy00OGMxLThmMDYtMWVmN2FiNDE5ODc2In0sImlhdCI6MTcyMDc5OTAwOH0.paC_w4VPCWkvzdJLH5XlLFl3rH4ms_1x8kUoSRCHmjQ";

const fetchGraphql = async (
  query: string,
  variables: Record<string, any> = {},
  otherParams: Record<string, any> = {}
) => {
  // Get the current session to retrieve the authorization token
  // const session = await getSession();
  let session: { token: string } = {
    token: auth_token,
  };

  // if (!session || !session.token) {
  //   throw new Error('User is not authenticated');
  // }

  // Set up the headers with the authorization token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`,
    ...otherParams.headers,
  };

  const requestBody = {
    query,
    variables,
    ...otherParams.body,
  };

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      requestBody,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("GraphQL request error:", error);
    throw new Error("Error making GraphQL request");
  }
};

export default fetchGraphql;
