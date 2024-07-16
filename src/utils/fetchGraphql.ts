// import axios from "axios";
// import { getSession } from "next-auth/react";

// const fetchGraphql = async (
//   query: string,
//   variables: Record<string, any> = {},
//   otherParams: Record<string, any> = {}
// ) => {
//   // Get the current session to retrieve the authorization token
//   const session = await getSession();

//   if (!session || !session.accessToken) {
//     throw new Error('User is not authenticated');
//   }

//   // Set up the headers with the authorization token
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${session.accessToken}`,
//     ...otherParams.headers,
//   };

//   const requestBody = {
//     query,
//     variables,
//     ...otherParams.body,
//   };

//   try {
//     const response = await axios.post(
//       process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
//       requestBody,
//       { headers }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("GraphQL request error:", error);
//     throw new Error("Error making GraphQL request");
//   }
// };

import axiosInstance from './axiosInstance';

const fetchGraphql = async (query: string, variables: Record<string, any> = {}, otherParams: Record<string, any> = {}) => {
  const requestBody = {
    query,
    variables,
    ...otherParams.body,
  };

  try {
    const response = await axiosInstance.post('', requestBody, { headers: otherParams.headers });
    return response.data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw new Error('Error making GraphQL request');
  }
};



export default fetchGraphql;
