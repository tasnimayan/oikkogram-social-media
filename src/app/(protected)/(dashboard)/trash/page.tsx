"use client";

import TrashOptions from "@/components/menu/trash-options";
import { Loading } from "@/components/ui/loading";
import { GET_TRASHED_POSTS } from "@/lib/api/api-feed";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../../AuthWrapper";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { ResultOf } from "gql.tada";

import React from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { getTimeDifference } from "@/lib/utils/index";
import AvatarInfo from "@/components/shared/avatar-info";

type TrashPostType = ResultOf<typeof GET_TRASHED_POSTS>["data"][number];

const TrashBin = () => {
  const { user } = useSessionContext();
  const userId = user?.id;

  const { data, isLoading } = useQuery({
    queryKey: [QK.POSTS, "TRASHED", { userId }],
    queryFn: () => useFetchGql(GET_TRASHED_POSTS, { user_id: userId }),
    select: response => response.data,
    enabled: !!userId,
  });

  if (isLoading) return <Loading />;
  if (!data) return null;

  return (
    <div>
      <h1 className="border-b pb-2">My Trash Bin</h1>
      <div className="post-list">
        {data.map(post => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default TrashBin;

export interface PostProps {
  post: TrashPostType;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const user = {
    id: post.user.id,
    name: post.user.name,
    image: post.user.image,
    time: getTimeDifference((post.created_at as string) || new Date()),
    privacy: post.privacy,
  };

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <AvatarInfo details={user} />
        <TrashOptions postId={post.id} />
      </div>

      <div className="mt-3">
        <p className="text-sm mb-3">{post.content}</p>
      </div>
    </div>
  );
};
