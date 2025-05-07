import { gql } from "../gql";

export const GET_PEOPLES = gql(`
  query GET_PEOPLES($userId: uuid!) {
    data: users(where: {id: {_neq: $userId}}) {
      id
      name
      image
      sent_req: from(limit: 1) {
        status
      }
      received_req: to(limit: 1) {
        status
      }
    }
  }
`);

export const SEND_CONNECTION_REQ = gql(`
  mutation SEND_CONNECTION_REQ($receiver: uuid!) {
    data:insert_connections_one(object: {receiver: $receiver}) {
      status
    }
  }
`);
