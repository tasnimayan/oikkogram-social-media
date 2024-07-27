"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { getFriendRequests } from "@/lib/queries";
import { useSession } from "next-auth/react";

import Spinner from "./Spinner";
import List from "./List";
import FriendCard from "./FriendCard";
import { useQuery } from "@tanstack/react-query";

const FriendList = () => {
  let { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-list"],
    queryFn: async () => {
      const variables = {
        user_id: session?.user.id,
        status: "accepted",
      };
      return await fetchGraphql(getFriendRequests, variables);
    },
  });

  if (isLoading) return <Spinner className="p-6 mt-6" />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div>
      <List
        data={data.data?.friends}
        component={FriendCard}
        emptyFallback={
          <p className="text-sm text-gray-300 text-center">
            No friends available{" "}
          </p>
        }
      />
    </div>
  );
};

export default FriendList;
