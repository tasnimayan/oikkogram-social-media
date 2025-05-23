"use client";

import { useQuery } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_PEOPLES } from "@/lib/api/api-connection";
import { MapPin, Users } from "lucide-react";
import { NearbyUserCard, UserSkeleton } from "./nearby-user-card";
import { QK } from "@/lib/constants/query-key";
import { useSession } from "next-auth/react";
import { VariablesOf } from "gql.tada";
const MAX_DISTANCE = 5;

const PeopleList = ({ searchQuery }: { searchQuery: any[] }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const searchFilter = searchQuery?.length > 0 ? { _or: searchQuery } : {};
  const filter: VariablesOf<typeof GET_PEOPLES>["filter"] = { id: { _neq: userId! }, ...searchFilter };

  const { data, error, isLoading } = useQuery({
    queryKey: [QK.PEOPLES, { filter }],
    queryFn: async () => useFetchGql(GET_PEOPLES, { filter }),
    enabled: !!userId,
  });

  if (isLoading) return <UserSkeleton />;
  if (error) return <p>An error occurred</p>;
  if (!data?.data) return <Empty />;

  const peoples = data.data.map((user, index) => ({
    ...user,
    distance: Math.round((index + 1) * 0.3 * 10) / 10,
    activeGroups: Math.floor(Math.random() * 4),
    activeCauses: Math.floor(Math.random() * 3),
    connectionStatus: ["none", "pending", "connected"][index % 3],
  }));

  return (
    <>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-4 w-4 mr-1" />
        <span>Showing neighbors within {MAX_DISTANCE} miles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {peoples.map((user) => (
          <NearbyUserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

const Empty = () => {
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Users className="h-6 w-6 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No neighbors found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or increasing the distance range</p>
    </div>
  );
};

export default PeopleList;
