import { gql } from "../gql";

// ============== Queries ===============

export const SearchUsers = `
  query SearchUsers($name: String!) {
    users(where: {name: {_ilike: $name}}) {
      id
      name
      image
    }
  }
`;

export const getPostWithStatus = `
  query GetPostsWithUserStatus($user_id: uuid!, $limit: Int = 10, $offset: Int = 0) {
    posts(limit: $limit, offset: $offset, order_by: {created_at: desc}, where: {is_deleted: {_eq: false}}) {
      id
      content
      created_at
      privacy
      files
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
`;

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

export const GET_USER_NOTIFICATIONS = gql(`
  query GET_USER_NOTIFICATIONS($offset: Int = 0, $limit: Int = 10) {
    data:notifications(order_by: {created_at: desc}, limit: $limit, offset: $offset) {
      id
      is_read
      type
      message
      created_at
      sender {
        id
        image
        name
      }
    }
  }
`);

export const getConversations = `
  query getConversations ($where: conversations_bool_exp = {}){
    conversations(where: $where, order_by: {created_at: desc}) {
      id
      user1: user {
        id
        image
        name
      }
      user2: userByUser2 {
        id
        image
        name
      }
    }
  }
`;

export const getMessages = `
  query getMessages($conversation_id: Int! ) {
    messages(where: {conversation_id: {_eq: $conversation_id}}, order_by: {created_at: asc}, limit: 20) {
      id
      message
      sender_id
      created_at
    }
    conversations:conversations_by_pk(id: $conversation_id) {
      user1:user {
        id
        image
        name
      }
      user2:userByUser2 {
        id
        image
        name
      }
    }
  }
`;

export const getTrashedPosts = `
  query getTrashedPosts($user_id: uuid) {
    posts(where: {is_deleted: {_eq: true}, user_id: {_eq: $user_id}}) {
      id
      privacy
      content
      created_at
      user {
        id
        image
        name
      }
    }
  }
`;

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

// ================= Insert Mutations ==================

export const sendMessage = `
  mutation sendMessage($conversation_id: Int!, $message: String!) {
    messages: insert_messages_one(object: {conversation_id: $conversation_id, message: $message}) {
      id
      created_at
    }
  }
`;

// =============== Update Mutations ==============

export const recoverPost = `
  mutation trashPost($id: Int!) {
    post: update_posts_by_pk(pk_columns: {id: $id}, _set: {is_deleted: false, deleted_at: null}) {
      updated_at
    }
  }
`;

// ================= Delete Mutations ===============

export const deletePost = `
  mutation deletePost($id: Int!) {
    post:delete_posts_by_pk(id: $id) {
      id
    }
  }
`;

// To be implement in chat list search
export const insertOrGetConversation = `
  mutation MyMutation($user1: uuid!, $user2: uuid!) {
    insert_or_get_conversation(args: {_user1: $user1, _user2: $user2}) {
      id
      user1
      user2
    }
  }
`;

export const messageSubscription = gql(`
  subscription MySubscription($created_at: timestamp, $conversation_id: Int!) {
    messages_stream(batch_size: 10, cursor: { initial_value: { created_at: $created_at } }, where: { conversation_id: { _eq: $conversation_id } }) {
      id
      content
      sender_id
      created_at
    }
  }
`);

export const setLikedPost = `
  mutation setLiked($post_id: Int!) {
    insert_post_likes_one(object: {post_id: $post_id}) {
      post_id
    }
  }
`;

export const unsetLikedPost = `
  mutation unsetLiked($post_id: Int!) {
    delete_post_likes(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
  }
`;

export const insertComment = `
  mutation insertComment($post_id: Int! , $content: String) {
    comments:insert_comments_one(object: {post_id: $post_id, content: $content}) {
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
`;
const user = `
  user {
    id
    name
    image
  }
`;

export const getComments = `
  query getComments($post_id: Int!) {
    comments(where: {post_id: {_eq: $post_id}}) {
      id
      content
      created_at
      ${user}
    }
  }
`;

export const updateUser = `
  mutation updateUserProfile($id: uuid!, $name: String, $image: String) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name, image: $image }) {
      id
      name
      image
    }
  }
`;

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
          id
          name
          image
        }
      }
    }
  }
`);
