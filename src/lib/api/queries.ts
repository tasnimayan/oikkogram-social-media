import { gql } from "../gql";

// ============== Queries ===============
export const GET_USER_NOTIFICATIONS = gql(`
  query GET_USER_NOTIFICATIONS($offset: Int = 0, $limit: Int = 10) {
    data:notifications(order_by: {created_at: desc}, limit: $limit, offset: $offset) {
      id
      is_read
      type
      message
      created_at
      sender {
        id
        image
        name
      }
    }
  }
`);

export const GET_CONVERSATIONS = gql(`
  query GET_CONVERSATIONS ($where: conversations_bool_exp = {}){
    data:conversations(where: $where, order_by: {created_at: desc}) {
      id
      user1: user {
        id
        image
        name
      }
      user2: userByUser2 {
        id
        image
        name
      }
    }
  }
`);

export const GET_FRIENDS = gql(`
  query GET_FRIENDS($user_id: uuid!) {
    data:connections(where: { status: {_eq: "accepted"} ,_or: [{sender_id: {_eq: $user_id}}, {receiver_id: {_eq: $user_id}}]}) {
      receiver {
        id
        name
        image
      }
      sender {
        id
        image
        name
      }
    }
  }
`);

// =============== Update Mutations ==============

// To be implement in chat list search
export const insertOrGetConversation = `
  mutation MyMutation($user1: uuid!, $user2: uuid!) {
    insert_or_get_conversation(args: {_user1: $user1, _user2: $user2}) {
      id
      user1
      user2
    }
  }
`;

export const UPDATE_USER_PROFILE = gql(`
  mutation UPDATE_USER_PROFILE($id: uuid!, $name: String, $image: String) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name, image: $image }) {
      id
      name
      image
    }
  }
`);

export const GET_BOOKMARKS = gql(`
  query GET_BOOKMARKS($user_id: uuid!) {
    data:bookmarks(where: {user_id: {_eq: $user_id}}) {
      created_at
      post {
        id
        content
        created_at
        media_urls
        user {
          id
          name
          image
        }
      }
    }
  }
`);
