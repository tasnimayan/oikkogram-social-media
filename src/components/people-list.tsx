"use client";

import PeopleCard from "./PeopleCard";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_PEOPLES } from "@/lib/api/api-connection";
import { MapPin, Users } from "lucide-react";
import { users } from "@/lib/constants/data";
import { NearbyUserCard } from "./features/network/nearby-user-card";
const MAX_DISTANCE = 5;

const PeopleList = () => {
  const session = useSessionContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["peoples"],
    queryFn: async () => {
      let variables = {
        userId: session.user?.id || "",
      };
      return useFetchGql(GET_PEOPLES, variables);
    },
  });

  if (isLoading) return <UserCardSkeleton />;
  if (error) return <p>An error occurred</p>;
  if (!data?.data) return <p>No data available</p>;

  const peoples = data.data.map((user, index) => ({
    ...user,
    distance: Math.round((index + 1) * 0.3 * 10) / 10, // 0.3, 0.6, 0.9, 1.2, etc. miles
    interests: [["Gardening", "Cooking", "Reading"][index % 3], ["Community Service", "Sports", "Arts"][Math.floor(index / 2) % 3]],
    activeGroups: Math.floor(Math.random() * 4),
    activeCauses: Math.floor(Math.random() * 3),
    connectionStatus: ["none", "pending", "connected"][index % 3],
  }));

  return (
    <>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-4 w-4 mr-1" />
        <span>
          Showing {peoples.length} neighbors within {MAX_DISTANCE} miles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {peoples.length > 0 ? peoples.map((user) => <NearbyUserCard key={user.id} user={user} />) : <Empty />}
        {data.data.map((people) => (
          <PeopleCard data={people} />
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
