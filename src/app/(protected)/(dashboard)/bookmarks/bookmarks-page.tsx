"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import AvatarInfo from "@/components/shared/avatar-info";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_BOOKMARKS } from "@/lib/api/queries";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/ui/loading";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

export default function BookmarksPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.BOOKMARKS, { userId }],
    queryFn: async () => useFetchGql(GET_BOOKMARKS, { user_id: userId! }),
    select: response => response.data,
    enabled: !!userId,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorResult />;
  if (!data?.length) return <EmptyResult message="No bookmarks found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(bookmark => {
        const details = {
          id: bookmark.post.user?.id!,
          name: bookmark.post.user?.name!,
          image: bookmark.post.user?.image!,
          time: new Date(bookmark.created_at).toDateString().slice(4),
        };

        return (
          <div key={bookmark.post.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between">
              <AvatarInfo details={details} />
            </div>
            <div className="mt-2">
              <span className="text-gray-600">{bookmark.post.content.slice(0, 80)}...</span>
              <Link href={`/posts/${bookmark.post.id}`} className="text-blue-500 hover:underline">
                See more
              </Link>
            </div>
            <div className="flex justify-between items-center mt-4"></div>
          </div>
        );
      })}
    </div>
  );
}
