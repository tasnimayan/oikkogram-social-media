import { gql } from "../gql";

export const ADD_CAUSE = gql(`
  mutation ADD_CAUSE($object: causes_insert_input!) {
    insert_causes_one(object: $object) {
      id
    }
  }
`);

export const GET_CAUSES = gql(`
  query GET_CAUSES($currentDate: timestamptz!, $offset: Int = 0) {
    data:causes(where: {_and: {start_date: {_gte: $currentDate}, status: {_eq: "ongoing"}}},  limit: 10,  offset: $offset) {
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
    }
  }

`);

export const DELETE_CAUSE = gql(`
  mutation DELETE_CAUSE($id: uuid!) {
    delete_causes_by_pk(id: $id) {
      id
    }
  }
`);
