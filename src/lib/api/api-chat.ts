import { gql } from "../gql";

import { gql as apolloGql } from "@apollo/client";

export const SEND_MESSAGE = gql(`
  mutation sendMessage($conversation_id: Int!, $content: String!) {
    messages: insert_messages_one(object: {conversation_id: $conversation_id, content: $content}) {
      id
      created_at
    }
  }
`);

export const GET_MESSAGES = gql(`
  query GET_MESSAGES ($conversation_id: Int!, $limit: Int = 20 ) {
    messages(where: {conversation_id: {_eq: $conversation_id}}, order_by: {created_at: desc}, limit: $limit) {
      id
      content
      sender_id
      created_at
    }
  }
`);

export const MESSAGE_SUBSCRIPTION = `
  subscription MESSAGE_SUBSCRIPTION ($created_at: timestamp, $conversation_id: Int!) {
    messages_stream(batch_size: 10, cursor: { initial_value: { created_at: $created_at } }, where: { conversation_id: { _eq: $conversation_id } }) {
      id
      content
      sender_id
      created_at
    }
  }
`;

export const GET_CONVERSATION = gql(`
  query GET_CONVERSATION ($conversation_id: Int! ) {
    data:conversations_by_pk(id: $conversation_id) {
      user1:user {
        id
        image
        name
      }
      user2:userByUser2 {
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

// To be implement in chat list search
// export const INSERT_OR_GET_CONVERSATION = gql(`
//   mutation INSERT_OR_GET_CONVERSATION($user1: uuid!, $user2: uuid!) {
//     insert_or_get_conversation(args: {_user1: $user1, _user2: $user2}) {
//       id
//       user1
//       user2
//     }
//   }
// `);
