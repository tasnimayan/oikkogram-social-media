"use client";

import TrashOptions from "@/components/menu/TrashOptions";
import SocialPost from "@/components/SocialPost";
import Spinner from "@/components/Spinner";
import fetchGraphql from "@/lib/fetchGraphql";
import { getTrashedPosts } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../../AuthWrapper";
import { PostType } from "@/lib/Interface";

const TrashBin = () => {
  const {user} = useSessionContext()
  const userId = user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["trash-posts", userId],
    queryFn: async () => await fetchGraphql(getTrashedPosts, { user_id: userId }),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="border-b pb-2">My Trash Bin</h1>
      <div className="post-list">
        {data.data.posts?.map((post:PostType) => (
          <SocialPost
            key={post.id}
            post={post}
            OptionsComponent={TrashOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default TrashBin;
