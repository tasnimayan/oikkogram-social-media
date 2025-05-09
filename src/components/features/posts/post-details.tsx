"use client";

import AvatarBox from "../../AvatarBox";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import LikeButton from "./like-button";
import dynamic from "next/dynamic";
const CommentSection = dynamic(() => import("./comment-section"));
import { useQuery } from "@tanstack/react-query";
import { GET_POST_BY_ID } from "@/lib/api/api-feed";
import { useParams } from "next/navigation";
import PostOptions from "./post-options";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Share } from "lucide-react";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";

const PostDetails = () => {
  const params = useParams();
  const postId = params.postId as string | number;
  const { user } = useSessionContext();
  const userId = user?.id;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QK.POST, { postId }],
    queryFn: () => useFetchGql(GET_POST_BY_ID, { post_id: +postId, user_id: userId }),
    select: (response) => response.data,
    enabled: !!postId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post details</div>;
  if (!post) return <div>Post not found</div>;

  const userAvatar = {
    ...post.user,
    time: post.created_at ? new Date(post.created_at).toDateString().slice(4) : new Date().toDateString().slice(4),
    privacy: post.privacy || "public",
  };

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-8">
      {/* User avatar */}
      <div className="flex justify-between">
        <AvatarBox details={userAvatar} />
        <PostOptions postId={post.id} isUser={userId === userAvatar.id} isBookmarked={!!post.isBookmarked?.aggregate?.count} />
      </div>

      {/* Content details */}
      <div>
        <p className="text-sm leading-6 text-gray-700 text-arial">{post.content}</p>

        {post.media_urls?.length && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img src={post.media_urls[0] || ""} alt="Post content" className="w-full object-cover max-h-96" />
          </div>
        )}
      </div>

      {/* Reaction and comments */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <LikeButton postId={post.id} initialStatus={post.isLiked?.aggregate?.count ?? 0} initialLikes={post.total_likes?.aggregate?.count ?? 0} />

          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <Link href={`/posts/${post.id}`}>
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments?.length ?? 0} Comments</span>
            </Link>
          </Button>
        </div>
        <div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:inline-block">Share</span>
          </Button>
        </div>
      </div>
      {/* All comments */}
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostDetails;
