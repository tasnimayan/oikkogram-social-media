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
  mutation SEND_CONNECTION_REQ($receiver_id: uuid!) {
    data:insert_connections_one(object: {receiver_id: $receiver_id}) {
      created_at
    }
  }
`);

// export const handleFriendRequest = `
//   mutation handleFriendRequest($status: String , $user_id: uuid, $friend_id: uuid) {
//     update_friends(where: {_and: {friend_id: {_eq: $user_id}, user_id: {_eq: $friend_id}}}, _set: {status: $status}) {
//       affected_rows
//     }
//   }
// `;
// export const CANCEL_CONNECTION_REQ = gql(`
//   mutation CANCEL_CONNECTION_REQ($friend_id: uuid!) {
//     delete_connections(where: { receiver: {_eq: $friend_id}}) {
//       affected_rows
//     }
//   }
// `);
