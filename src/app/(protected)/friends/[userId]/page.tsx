
"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { getUserFriends } from "@/lib/queries";

import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { UserType } from "@/lib/Interface";
import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";
import List from "@/components/List";
import Link from "next/link";

const FriendListCard = ({
  data,
}: {
  data: { friend: UserType; user: UserType };
}) => {
  const params = useParams();
  const userId = params.userId as string;
  const friend = data.user.id === userId ? data.friend : data.user;
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="w-full h-44">
        <img
          src={friend.image ?? ''}
          className="w-full h-full object-cover cursor-pointer border shadow-sm"
        />
      </div>
      <div className="p-2 text-center">
        <Link href={`/profile/${friend.id}`} className="text-md">
          {friend.name}
        </Link>

      </div>
    </div>
  );
};




type FriendCard = {
  user: UserType;
  friend: UserType;
};
const FriendList = () => {
  const { user }= useSessionContext();
  const params = useParams()
  const userId = params.userId as string
  const [friends, setFriends] = useState<FriendCard[]>([])

  const { error, isLoading } = useQuery({
    queryKey: ["friend-list", user?.id],
    queryFn: async () => {
      const variables = {
        user_id: userId,
      };
      const response = await fetchGraphql(getUserFriends, variables);
      if(response.errors) {
        throw new Error('Error fetching data')
      }
      setFriends(response.data.friends)
      return response
    },
  });

  if (isLoading) return <UserCardSkeleton />;

  if (error) return <p>An error occurred</p>;

  return (
    <div className="">
      <div>
        <h4 className="text-lg font-semibold">Friend List</h4>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-2 p-4">
        <List
          data={friends}
          component={FriendListCard}
          emptyFallback={
            <p className="text-sm text-gray-300 text-center">
              No friends available
            </p>
          }
        />
      </div>
    </div>
  );
};

export default FriendList;
