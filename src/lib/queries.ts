import { gql } from "@apollo/client";

// ============== Queries ===============
export const getUserProfile = `
  query getUserProfile($id: uuid!) {
    user:users_by_pk(id: $id) {
      name
      image
      email
      id
      posts {
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
  }
`

export const SearchUsers= `
  query SearchUsers($name: String!) {
    users(where: {name: {_ilike: $name}}) {
      id
      name
      email
    }
  }
`

export const getAllPost = `
  query getAllPost($limit: Int=2, $offset: Int = 0) {
    posts(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
      id
      content
      created_at
      privacy
      user {
        id
        name
        image
      }
    }
  }
`;
export const getPostDetails = `
  query getPostDetails($id: Int!) {
    post: posts_by_pk(id: $id) {
      id
      content
      privacy
      user {
        id
        image
        name
      }
    }
}
`;
export const getAllPeople = `
  query getAllPeople($id: uuid) {
    users(where: {id: {_neq: $id}}) {
      id
      name
      image
    }
  }
`;

export const getFriendRequests = `
  query getFriendRequests($status: String, $user_id: uuid) {
    friends(where: {_and: {friend_id: {_eq: $user_id}}, status: {_eq: $status}}) {
      status
      user:userByUserId {
        id
        name
        image
      }
    }
  }
`;

export const getNotifications = `
  query getNotifications {
    notifications(order_by: {created_at: desc}) {
      id
      is_read
      type
      created_at
    }
  }
`;

export const getConversations = `
  query getConversations {
    conversations(order_by: {created_at: desc}) {
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

// ================= Insert Mutations ==================

export const createPost = `
  mutation CreatePost($content: String, $privacy: String) {
    insert_posts_one(object: {content: $content, privacy: $privacy}) {
      content
      id
      privacy
    }
  }
`;

export const sendFriendRequest = `
  mutation sendFriendRequest($friend_id: uuid!) {
    insert_friends_one(object: {friend_id: $friend_id}) {
      status
      friend_id
    }
  }
`;

export const sendMessage = `
  mutation sendMessage($conversation_id: Int!, $message: String!) {
    messages: insert_messages_one(object: {conversation_id: $conversation_id, message: $message}) {
      id
      created_at
    }
  }
`;

// =============== Update Mutations ==============

export const handleFriendRequest = `
  mutation handleFriendRequest($status: String , $user_id: uuid, $friend_id: uuid) {
    update_friends(where: {_and: {friend_id: {_eq: $user_id}, user_id: {_eq: $friend_id}}}, _set: {status: $status}) {
      affected_rows
    }
  }
`;

export const trashPost = `
  mutation trashPost($id: Int!) {
    post: update_posts_by_pk(pk_columns: {id: $id}, _set: {is_deleted: true, deleted_at: now}) {
      updated_at
    }
  }
`;

export const updatePost = `
  mutation updatePost($id: Int!, $content: String, $privacy: String) {
    post: update_posts_by_pk(pk_columns: {id: $id}, _set: {content: $content, privacy: $privacy}) {
      id
      content
      privacy
    }
  }
`;

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
export const getConversation = `
  mutation MyMutation($user1: uuid!, $user2: uuid!) {
    insert_or_get_conversation(args: {_user1: $user1, _user2: $user2}) {
      id
      user1
      user2
    }
  }
`;

export const messageSubscription = gql`
  subscription MySubscription($created_at: timestamp, $conversation_id: Int!) {
    messages_stream(
      batch_size: 10
      cursor: { initial_value: { created_at: $created_at } }
      where: { conversation_id: { _eq: $conversation_id } }
    ) {
      id
      message
      sender_id
      created_at
    }
  }
`;
