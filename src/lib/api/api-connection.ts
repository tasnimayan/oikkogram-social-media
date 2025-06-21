import { gql } from "../gql";

export const GET_PEOPLES = gql(`
  query GET_PEOPLES($filter: users_bool_exp = {}, $offset: Int = 0, $limit: Int = 20, $userId: uuid!) {
    data: users(where: $filter, limit: $limit, offset: $offset) {
      id
      name
      image
      received_req: connection_sender(where: {sender_id: {_eq: $userId}}, limit: 1) {
        status
      }
      sent_req: connection_receiver(where: {sender_id: {_eq: $userId}}, limit: 1) {
        status
      }
    }
  }

`);

export const SEND_CONNECTION_REQ = gql(`
  mutation SEND_CONNECTION_REQ($receiver_id: uuid!) {
    data:insert_connections_one(object: {receiver_id: $receiver_id}) {
      created_at
    }
  }
`);

export const UPDATE_CONNECTION_REQ = gql(`
  mutation UPDATE_CONNECTION_REQ($sender_id: uuid!, $receiver_id: uuid!, $status: String!) {
    update_connections_by_pk(pk_columns: {receiver_id: $receiver_id, sender_id: $sender_id}, _set: {status: $status}) {
      status
    }
  }
`);

export const CANCEL_CONNECTION_REQ = gql(`
  mutation CANCEL_CONNECTION_REQ($receiver_id: uuid!, $sender_id: uuid!) {
    delete_connections_by_pk(receiver_id: $receiver_id, sender_id: $sender_id) {
      status
    }
  }
`);

export const GET_CONNECTION_REQS = gql(`
  query GET_CONNECTION_REQS($status: String, $user_id: uuid) {
    data:connections(where: {_and: {receiver_id: {_eq: $user_id}}, status: {_eq: $status}}) {
      status
      user:sender {
        id
        name
        image
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
