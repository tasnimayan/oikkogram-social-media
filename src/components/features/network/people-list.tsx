"use client";

import { useQuery } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_NEARBY_PEOPLE } from "@/lib/api/api-connection";
import { NearbyUserCard } from "./nearby-user-card";
import { QK } from "@/lib/constants/query-key";
import { useSession } from "next-auth/react";
import { PeopleSkeleton } from "@/components/skeletons/people-skeleton";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

const PeopleList = ({ searchQuery }: { searchQuery: any[] }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const searchFilter = searchQuery?.length > 0 ? { _or: searchQuery } : {};

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.PEOPLES, { userId, searchFilter }],
    queryFn: async () => useFetchGql(GET_NEARBY_PEOPLE, { userId: userId!, filter: searchFilter }),
    select: data => data.data,
    enabled: !!userId,
  });

  if (isLoading) return <PeopleSkeleton />;
  if (isError) return <ErrorResult />;
  if (!data?.length) return <EmptyResult message="No neighbors found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {data.map(user => (
        <NearbyUserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default PeopleList;
// query GET_ALL_USERS($userId: uuid!, $limit: Int = 20, $offset: Int = 0) {
//   data: profiles(where: {user_id: {_neq: $userId}, _and: {
//     _not:{
//       connection_receiver: {
//         _or: [{sender_id: {_eq: $userId}}, {receiver_id: {_eq: $userId}}]
//       }
//     }
//   }}, limit: $limit, offset: $offset) {
//     id: user_id
//     name
//     image: profile_photo_url
//     sent_req: connection_sender(where: {sender_id: {_eq: $userId}}, limit: 1) {
//       status
//     }
//     causes_aggregate {
//       aggregate {
//         count
//       }
//     }
//   }
// }
