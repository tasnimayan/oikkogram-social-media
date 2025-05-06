import { gql } from "../gql";

export const GET_POSTS = gql(`
  query GET_POSTS ($user_id: uuid!, $limit: Int = 10, $offset: Int = 0) {
    data:posts(limit: $limit, offset: $offset, order_by: {created_at: desc}, where: {is_deleted: {_eq: false}}) {
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
      isLiked: post_likes_aggregate(where: {user_id: {_eq: $user_id}}) {
        aggregate {
          count
        }
      }
      isBookmarked: bookmarks_aggregate {
        aggregate {
          count
        }
      }
      total_likes: post_likes_aggregate {
        aggregate {
          count
        }
      }
      total_comments: comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`);

export const CREATE_POST = gql(`
  mutation CREATE_POST($content: String, $privacy: String, $media_urls:[String!]) {
    data:insert_posts_one(object: {content: $content, privacy: $privacy, media_urls:$media_urls}) {
      id
    }
  }
`);

export const SET_BOOKMARK = gql(`
  mutation SET_BOOKMARK($post_id: Int!) {
    insert_bookmarks_one(object: {post_id: $post_id}) {
      post_id
    }
  }
`);

export const UNSET_BOOKMARK = gql(`
  mutation UNSET_BOOKMARK($post_id: Int!) {
    delete_bookmarks(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
  }
`);

export const TRASH_POST = gql(`
  mutation TRASH_POST($id: bigint!) {
    data: update_posts_by_pk(pk_columns: {id: $id}, _set: {is_deleted: true, deleted_at: now}) {
      updated_at
    }
  }
`);
