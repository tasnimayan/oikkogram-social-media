import { gql } from "../gql";

export const SEND_MESSAGE = gql(`
  mutation sendMessage($conversation_id: Int!, $content: String!) {
    messages: insert_messages_one(object: {conversation_id: $conversation_id, content: $content}) {
      id
      created_at
    }
  }
`);

export const GET_MESSAGES = gql(`
  query GET_MESSAGES ($conversation_id: Int!, $limit: Int = 20, $offset: Int = 0 ) {
    data:messages(where: {conversation_id: {_eq: $conversation_id}}, order_by: {created_at: desc}, limit: $limit, offset: $offset) {
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

export const GET_CHAT_USER = gql(`
  query GET_CHAT_USER($conversation_id: Int!, $userId: uuid!) {
    data: conversations_by_pk(id: $conversation_id) {
      participants(where: {user_id: {_neq: $userId}}) {
        user {
          user_id
          name
          profile_photo_url
        }
      }
    }
  }
`);

export const GET_CONVERSATIONS = gql(`
  query GET_CONVERSATIONS ($where: conversations_bool_exp = {}, $userId: uuid!){
    data:conversations(where: $where, order_by: {created_at: desc}) {
      id
      participants(where: {user_id: {_neq: $userId}}) {
        user {
          user_id
          name
          profile_photo_url
        }
      }
      messages(order_by: {created_at: desc}, limit: 1) {
        content
        created_at
      }
    }
  }
`);

// ===========
export const GET_CONVERSATION = gql(`
  query GET_CONVERSATION($userId1: uuid!, $userId2: uuid!) {
    data:conversations(where: {_and: [{participants: {user_id: {_eq: $userId1}}}, {participants: {user_id: {_eq: $userId2}}}, {type: {_eq: "private"}}]}, limit: 1) {
      id
    }
  }
`);

export const INSERT_CONVERSATION = gql(`
  mutation INSERT_CONVERSATION($userId1: uuid!, $userId2:uuid!) {
    data:insert_conversations_one(object: {
      type: "private",
      participants: {data: [
        {user_id: $userId1},
        {user_id: $userId2}
      ]}
    }) {
      id
    }
  }
`);
