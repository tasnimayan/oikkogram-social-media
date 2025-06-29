"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import AvatarInfo from "@/components/shared/avatar-info";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_BOOKMARKS } from "@/lib/api/queries";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const SavedPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading } = useQuery({
    queryKey: [QK.BOOKMARKS, { userId }],
    queryFn: async () => useFetchGql(GET_BOOKMARKS, { user_id: userId! }),
    select: response => response.data,
    enabled: !!userId,
  });

  if (isLoading) return <Loader2 className="animate-spin" />;
  if (!data?.length) return <p className="text-center col-span-full">No bookmarks yet.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarked Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(bookmark => {
          const details = {
            id: bookmark.post.user.id,
            name: bookmark.post.user.name,
            image: bookmark.post.user.image,
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
    </div>
  );
};

export default SavedPage;
