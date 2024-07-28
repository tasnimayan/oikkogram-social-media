"use client";

import PeopleCard from "./PeopleCard";
import fetchGraphql from "@/lib/fetchGraphql";
import { getAllPeople } from "@/lib/queries";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import List from "./List";

const Peoples = () => {
  const { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["peoples"],
    queryFn: async () => {
      let variables = {
        id: session.user?.id,
      };
      return await fetchGraphql(getAllPeople, variables);
    },
  });

  if (isLoading) return <UserCardSkeleton />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col gap-y-2">
      <List
        data={data.data?.users}
        component={PeopleCard}
        emptyFallback={
          <p className="text-sm text-gray-300 text-center">
            No user available{" "}
          </p>
        }
      />
    </div>
  );
};

export default Peoples;
