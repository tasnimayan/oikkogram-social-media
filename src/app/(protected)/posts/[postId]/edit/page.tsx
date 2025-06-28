"use client";
import UpdatePostForm from "@/components/forms/UpdatePostForm";
import { useParams } from "next/navigation";
import { useFetchGql } from "@/lib/api/graphql";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GET_POST_BY_ID } from "@/lib/api/api-feed";
import { Loading } from "@/components/ui/loading";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

const UpdatePost = () => {
  const params = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { postId } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: () => useFetchGql(GET_POST_BY_ID, { user_id: userId, post_id: Number(postId) }),
    enabled: !!postId,
  });

  if (isLoading) return <Loading className="mt-20" />;
  if (isError) return <ErrorResult />;
  if (!data?.data) return <EmptyResult />;

  return (
    <div className="border shadow bg-white rounded-lg px-2 py-4">
      <h4 className="text-center text-lg ">Edit Post</h4>
      <hr />
      <UpdatePostForm post={data.data} />
    </div>
  );
};

export default UpdatePost;
