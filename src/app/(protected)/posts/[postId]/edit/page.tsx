"use client";
import { useParams } from "next/navigation";
import { useFetchGql } from "@/lib/api/graphql";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GET_POST_BY_ID } from "@/lib/api/api-feed";
import { Loading } from "@/components/ui/loading";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";
import PostForm from "@/components/features/feed/post-form";

const UpdatePost = () => {
  const params = useParams();
  const { data: session } = useSession();

  const { postId } = params;
  const userId = session?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: () => useFetchGql(GET_POST_BY_ID, { user_id: userId, post_id: Number(postId) }),
    enabled: !!postId,
  });

  if (isLoading) return <Loading className="mt-20" />;
  if (isError) return <ErrorResult />;
  if (!data?.data) return <EmptyResult />;

  return (
    <div className="max-w-4xl bg-white sm:mx-auto overflow-hidden h-[calc(100vh-6rem)] sm:my-6 px-2 py-4 flex flex-col sm:rounded-xl">
      <h4 className="text-center text-2xl font-semibold mb-4 ">Update Post</h4>
      <hr className="mb-4" />

      <PostForm post={data.data} />
    </div>
  );
};

export default UpdatePost;
