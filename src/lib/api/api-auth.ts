import { gql } from "../gql";

// GraphQL queries for user operations
export const GET_USER_BY_EMAIL = gql(`
  query GET_USER_BY_EMAIL($email: String!) {
    data:users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      emailVerified
      password
      profile{
        name
        image:profile_photo_url
      }
    }
  }
`);

export const CREATE_USER_WITH_PASSWORD = gql(`
  mutation CREATE_USER_WITH_PASSWORD($email: String!, $name: String, $password: String!, $profile: profiles_insert_input = {}) {
    data: insert_users_one(object: {email: $email, name: $name, password: $password, profile: {data: $profile}}) {
      id
      email
      profile{
        name
        image:profile_photo_url
      }
    }
  }
`);
