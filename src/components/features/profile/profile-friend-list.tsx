"use client";

import Link from "next/link";

import { GET_FRIENDS } from "@/lib/api/api-connection";
import { useQuery } from "@tanstack/react-query";
import FriendCardImage from "./friend-card-image";
import FriendCardSkeleton from "../../skeletons/FriendCardSkeleton";
import { useParams } from "next/navigation";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { Card } from "@/components/ui/card";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

const ProfileFriendList = () => {
  const params = useParams();
  const { userId } = params;

  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.CONNECTIONS, { userId }],
    queryFn: () => useFetchGql(GET_FRIENDS, { user_id: String(userId) }),
  });

  if (isLoading) return <FriendCardSkeleton />;
  if (isError) return <ErrorResult />;
  if (!data?.data) return <EmptyResult message="No friends available" />;

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Friends</h4>
        <Link href={`/connections/${userId}`} className="text-blue-500 hover:text-blue-700 text-sm">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {data.data.map(friend => (
          <FriendCardImage connection={friend} />
        ))}
      </div>
    </Card>
  );
};

export default ProfileFriendList;
