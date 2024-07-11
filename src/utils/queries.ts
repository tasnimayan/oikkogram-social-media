// ============== Queries ===============
export const getAllPost = `
  query getAllPost($limit: Int=10, $offset: Int = 0) {
    posts(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
      content
      created_at
      id
      privacy
      user {
        id
        name
      }
    }
  }
`
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
`
export const getAllPeople = `
  query getAllPeople($id: uuid) {
    users(where: {id: {_neq: $id}}) {
      id
      image
      name
    }
  }
`

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
`

// ================= Mutations ==================

export const createPost = `
  mutation CreatePost($content: String, $privacy: String) {
    insert_posts_one(object: {content: $content, privacy: $privacy}) {
      content
      id
      privacy
    }
  }
`

export const sendFriendRequest = `
  mutation sendFriendRequest($friend_id: uuid) {
    insert_friends_one(object: {friend_id: $friend_id}) {
      status
      friend_id
    }
  }
`


// =============== Update Mutations ==============

export const handleFriendRequest= `
  mutation handleFriendRequest($status: String , $user_id: uuid, $friend_id: uuid) {
    update_friends(where: {_and: {friend_id: {_eq: $user_id}, user_id: {_eq: $friend_id}}}, _set: {status: $status}) {
      affected_rows
    }
  }
`

export const trashPost =`
  mutation trashPost($id: Int!) {
    post:update_posts_by_pk(pk_columns: {id: $id}, _set: {is_deleted: true}) {
      updated_at
    }
  }
`

export const updatePost = `
  mutation updatePost($id: Int!, $content: String, $privacy: String) {
    post: update_posts_by_pk(pk_columns: {id: $id}, _set: {content: $content, privacy: $privacy}) {
      id
      content
      privacy
    }
  }
`