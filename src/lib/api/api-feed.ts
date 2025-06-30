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
        id:user_id
        name
        image:profile_photo_url
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

export const GET_POST_BY_ID = gql(`
  query GET_POST_BY_ID($user_id:uuid, $post_id: bigint!) {
    data: posts_by_pk(id: $post_id) {
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
      isLiked: post_likes_aggregate (where: {user_id: {_eq: $user_id}}) {
        aggregate {
          count
        }
      }
      isBookmarked: bookmarks_aggregate {
        aggregate {
          count
        }
      }
      total_likes:post_likes_aggregate {
        aggregate {
          count
        }
      }
      comments:comments(order_by: { created_at: asc }) {
        id
        content
        created_at
        user {
          id
          name
          image
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

export const UPDATE_POST = gql(`
  mutation UPDATE_POST($postId: bigint!, $content: String, $privacy: String,$media_urls:[String!]) {
    data: update_posts_by_pk(pk_columns: {id: $postId}, _set: {content: $content, privacy: $privacy, media_urls:$media_urls}) {
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

export const RECOVER_POST_FROM_TRASH = gql(`
  mutation RECOVER_POST_FROM_TRASH($id: bigint!) {
    post: update_posts_by_pk(pk_columns: {id: $id}, _set: {is_deleted: false, deleted_at: null}) {
      updated_at
    }
  }
`);

// ================= Delete Mutations ===============

export const DELETE_POST = gql(`
  mutation DELETE_POST($id: bigint!) {
    post:delete_posts_by_pk(id: $id) {
      id
    }
  }
`);

export const SET_LIKE = gql(`
  mutation setLiked($post_id: Int!) {
    insert_post_reactions_one(object: {post_id: $post_id}) {
      post_id
    }
  }
`);

export const UNSET_LIKE = gql(`
  mutation unsetLiked($post_id: Int!) {
    delete_post_reactions(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
  }
`);

export const INSERT_COMMENT = gql(`
  mutation INSERT_COMMENT($post_id: bigint! , $content: String) {
    comments:insert_post_comments_one(object: {post_id: $post_id, content: $content}) {
      id
      content
      created_at
      user {
        id
        name
        image
      }
    }
  }
`);

const user = `
  user {
    id
    name
    image
  }
`;

export const GET_POST_COMMENTS = gql(`
  query GET_POST_COMMENTS($post_id: bigint!) {
    data:post_comments(where: {post_id: {_eq: $post_id}}) {
      id
      content
      created_at
      ${user}
    }
  }
`);

export const GET_TRASHED_POSTS = gql(`
  query GET_TRASHED_POSTS($user_id: uuid) {
    data:posts(where: {is_deleted: {_eq: true}, user_id: {_eq: $user_id}}) {
      id
      privacy
      content
      created_at
      user {
        id:user_id
        image:profile_photo_url
        name
      }
    }
  }
`);
