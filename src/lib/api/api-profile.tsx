import { gql } from "../gql";

export const GET_USER_PROFILE = gql(`
  query GET_USER_PROFILE ($user_id: uuid!) {
    data: users_by_pk(id: $user_id) {
      name
      image
      email
      id
    }
  }
`);

export const GET_USER_POSTS = gql(`
  query GET_USER_POSTS($user_id: uuid!, $limit: Int=10, $offset: Int = 0) {
    data:posts(limit: $limit, offset: $offset, order_by: {created_at: desc}, where: {user_id: {_eq: $user_id}}){
      id
      content
      created_at
      privacy
      media_urls
      user {
        id
        name
        image
      }
      isLiked:post_likes_aggregate(where: {user_id: {_eq: $user_id}}) {
        aggregate {
          count
        }
      }
      isBookmarked:bookmarks_aggregate {
        aggregate {
          count
        }
      }
       total_comments: comments_aggregate {
        aggregate {
          count
        }
      }
      total_likes:post_likes_aggregate{
        aggregate{
          count
        }
      }
    }
  }
  
`);
