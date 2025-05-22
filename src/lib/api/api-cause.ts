import { gql } from "../gql";

export const ADD_CAUSE = gql(`
  mutation ADD_CAUSE($object: causes_insert_input!) {
    data:insert_causes_one(object: $object) {
      id
    }
  }
`);

export const GET_CAUSES = gql(`
  query GET_CAUSES($offset: Int = 0) {
    data:causes(where: {_and: {start_date: {_gte: now}, status: {_eq: "ongoing"}}},  limit: 10,  offset: $offset) {
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
        id
        image
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
