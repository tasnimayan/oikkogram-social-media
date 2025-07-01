import { gql } from "../gql";

export const GET_NEARBY_PEOPLE = gql(`
  query GET_ALL_USERS($userId: uuid!, $filter: profiles_bool_exp = {}, $limit: Int = 20, $offset: Int = 0) {
    data: profiles(where: {user_id: {_neq: $userId},
     _and: [{
      _not:{
        connection_receiver: {
          _or: [{sender_id: {_eq: $userId}}, {receiver_id: {_eq: $userId}}]
        }
      }
    }, $filter]}, limit: $limit, offset: $offset) {
    
      id:user_id
      name
      image:profile_photo_url
      sent_req: connection_sender(where: {sender_id: {_eq: $userId}}, limit: 1) {
        status
      }
      causes_aggregate {
        aggregate {
          count
        }
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

export const DELETE_CONNECTION_REQ = gql(`
  mutation DELETE_CONNECTION_REQ($receiver_id: uuid!, $sender_id: uuid!) {
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
        id:user_id
        name
        image:profile_photo_url
      }
    }
  }
`);

export const GET_FRIENDS = gql(`
  query GET_FRIENDS($user_id: uuid!) {
    data:connections(where: { status: {_eq: "accepted"} ,_or: [{sender_id: {_eq: $user_id}}, {receiver_id: {_eq: $user_id}}]}) {
      receiver {
        id:user_id
        name
        image:profile_photo_url
      }
      sender {
        id:user_id
        image:profile_photo_url
        name
      }
    }
  }
`);
