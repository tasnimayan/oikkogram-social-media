import { gql } from "../gql";

export const GET_USER_NEIGHBORHOOD = gql(`
  query GET_USER_NEIGHBORHOOD($userId: uuid!) {
    data:user_neighborhood_by_pk(user_id: $userId) {
      neighborhood {
        id
        name
        description
        created_at
        updated_at
      }
    }
  }
`);

export const GET_NEIGHBORHOODS = gql(`
  query GET_NEIGHBORHOODS {
    data:neighborhoods {
      id
      name
      description
      district
      division
      country_code
      geo_polygon
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
