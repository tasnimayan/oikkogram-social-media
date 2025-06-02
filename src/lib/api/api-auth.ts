import { gql } from "../gql";

// GraphQL queries for user operations
export const GET_USER_BY_EMAIL = gql(`
  query GET_USER_BY_EMAIL($email: String!) {
    data:users(where: { email: { _eq: $email } }, limit: 1) {
      id
      name
      email
      emailVerified
      image
      password
    }
  }
`);

export const CREATE_USER_WITH_PASSWORD = gql(`
  mutation CREATE_USER_WITH_PASSWORD($email: String!, $name: String, $password: String!) {
    data:insert_users_one(object: { email: $email, name: $name, password: $password }) {
      id
      email
      name
      image
    }
  }
`);
