import { gql } from "../gql";

export const ADD_CAUSE = gql(`
  mutation ADD_CAUSE($object: causes_insert_input!) {
    data:insert_causes_one(object: $object) {
      id
    }
  }
`);

export const GET_CAUSES = gql(`
  query GET_CAUSES($filter: causes_bool_exp = {},$offset: Int = 0, $limit: Int = 10) {
    data:causes(where: {_and: [
      {start_date: {_gte: now}},
      {status: {_eq: "ongoing"}},
      $filter
    ]}, limit: $limit, offset: $offset) {
      category
      cover_img_url
      created_at
      current_value
      description
      end_date
      goal_type
      goal_value
      id
      location
      neighborhood_id
      start_date
      status
      tags
      title
      created_by:user {
        id:user_id
        image:profile_photo_url
        name
      }
      is_supporter:cause_supporter {
        id
      }
      total_supporters:cause_supporters_aggregate {
        aggregate {
          count
        }
      }
      total_volunteers:volunteers_aggregate {
        aggregate {
          count
        }
      } 
    }
  }
`);

export const DELETE_CAUSE = gql(`
  mutation DELETE_CAUSE($id: uuid!) {
    update_causes_by_pk(pk_columns: {id: $id}, _set: {deleted_at: now, status: "cancelled"}) {
      id
    }
  }
`);

export const SUPPORT_CAUSE = gql(`
  mutation SUPPORT_CAUSE($cause_id: uuid!) {
    insert_cause_supporters_one(object: {cause_id: $cause_id}) {
      id
    }
  }
`);

export const UNSUPPORT_CAUSE = gql(`
  mutation UNSUPPORT_CAUSE($cause_id: uuid!) {
    delete_cause_supporters(where: {cause_id: {_eq: $cause_id}}) {
      affected_rows
    }
  }
`);

export const INSERT_CAUSE_VOLUNTEER = gql(`
  mutation INSERT_CAUSE_VOLUNTEER($object: volunteers_insert_input!) {
    insert_volunteers_one(object: $object) {
      id
    }
  }
`);

export const GET_CAUSE_SUPPORTERS = gql(`
  query GET_CAUSE_SUPPORTERS($cause_id: uuid!) @cached {
    data: cause_supporters(where: {cause_id: {_eq: $cause_id}}) {
      id
      created_at
      user {
        id:user_id
        image:profile_photo_url
        name
      }
    }
    total_supporters: cause_supporters_aggregate(where: {cause_id: {_eq: $cause_id}}) {
      aggregate {
        count
      }
    }
  }
`);

export const GET_CAUSE_VOLUNTEERS = gql(`
  query GET_CAUSE_VOLUNTEERS($cause_id: uuid!) @cached {
    data: volunteers(where: {cause_id: {_eq: $cause_id}}) {
      id
      skills
      user {
        id:user_id
        name
        image:profile_photo_url
      }
    }
  }
`);

export const GET_CAUSE_BY_ID = gql(`
  query GET_CAUSE_BY_ID($id: uuid!) {
    data:causes_by_pk(id: $id) {
      category
      cover_img_url
      created_at
      current_value
      description
      end_date
      goal_type
      goal_value
      id
      location
      neighborhood_id
      start_date
      status
      tags
      title
      created_by:user {
        id:user_id
        image:profile_photo_url
        name
      }
      is_supporter:cause_supporter {
        id
      }
      total_supporters:cause_supporters_aggregate {
        aggregate {
          count
        }
      }
      total_volunteers:volunteers_aggregate {
        aggregate {
          count
        }
      } 
    }
  }

`);

export const GET_CAUSES_BY_USER = gql(`
  query GET_CAUSES_BY_USER($offset: Int = 0, $userId: uuid!) {
    data: causes(where: {created_by: {_eq: $userId}}, limit: 10, offset: $offset, order_by: {created_at: desc}) {
      category
      cover_img_url
      created_at
      current_value
      description
      end_date
      goal_type
      goal_value
      id
      location
      neighborhood_id
      start_date
      status
      tags
      title
      created_by: user {
        id:user_id
        image:profile_photo_url
        name
      }
      is_supporter: cause_supporter {
        id
      }
      total_supporters: cause_supporters_aggregate {
        aggregate {
          count
        }
      }
      total_volunteers: volunteers_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`);
