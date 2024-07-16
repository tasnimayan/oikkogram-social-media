"use client";

// This component is responsible for fetching all post of user
import SocialPost from "./SocialPost";
import fetchGraphql from "@/utils/fetchGraphql";
import { getAllPost } from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PostSkeleton from "./skeletons/PostSkeleton";
import PostOptions from "./menu/PostOptions";

const AllPost = () => {
  const params = useSearchParams();
  const page = params.get("page") ?? 0;

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      let offset = parseInt(page) * 10;
      let variables = {
        // limit: limit,
        offset: offset,
      };
      return await fetchGraphql(getAllPost, variables);
    },
  });

  if (isLoading) return <PostSkeleton />;

  if (error) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col gap-6">
      {data.data?.posts.map((post) => {
        return <SocialPost key={post.id} post={post} OptionsComponent={PostOptions}/>;
      })}
    </div>
  );
};

export default AllPost;
