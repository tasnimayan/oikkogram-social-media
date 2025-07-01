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
        id:user_id
        image:profile_photo_url
        name
      }
    }
  }
`);

// =============== Update Mutations ==============
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
          id:user_id
          name
          image:profile_photo_url
        }
      }
    }
  }
`);
