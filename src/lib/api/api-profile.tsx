import { gql } from "../gql";

export const GET_USER_PROFILE = gql(`
  query GET_USER_PROFILE ($user_id: uuid!) {
    data: profiles_by_pk(user_id: $user_id) {
      id:user_id
      first_name
      last_name
      name
      user_name
      bio
      profile_photo_url
      gender
      dob
      phone_number
      occupation
      address
      interests
      created_at
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
        id:user_id
        name
        image:profile_photo_url
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

export const UPDATE_USER_PROFILE = gql(`
  mutation UPDATE_USER_PROFILE($userId: uuid!, $_set: profiles_set_input = {}) {
    update_profiles_by_pk(pk_columns: {user_id: $userId}, _set: $_set) {
      user_id
    }
  }
`);
