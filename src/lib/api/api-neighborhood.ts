import { gql } from "../gql";

export const GET_USER_NEIGHBORHOOD = gql(`
  query GET_USER_NEIGHBORHOOD($userId: uuid!) {
    data:user_neighborhood_by_pk(user_id: $userId) {
      neighborhood {
        id
        name
        description
        created_at
      }
      created_at
    }
  }
`);

export const GET_NEIGHBORHOODS = gql(`
  query GET_NEIGHBORHOODS($filter: neighborhoods_bool_exp = {}, $limit: Int = 20, $offset: Int = 0) {
    data:neighborhoods (where: $filter, limit: $limit, offset: $offset) {
      id
      name
      description
      district
      division
      country_code
      geo_polygon
      center_lat
      center_lng
      created_at
      updated_at
      is_verified
      location_type
      member_count:user_neighborhoods_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`);

export const INSERT_USER_NEIGHBORHOOD = gql(`
  mutation INSERT_USER_NEIGHBORHOOD($neighborhood_id: uuid!) {
    insert_user_neighborhood_one(object: {neighborhood_id: $neighborhood_id}, 
    on_conflict: {constraint: user_neighborhood_pkey, update_columns: neighborhood_id}) {
      id
    }
  }
`);
