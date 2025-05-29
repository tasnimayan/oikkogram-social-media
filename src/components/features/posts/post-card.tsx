import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share } from "lucide-react";
import Link from "next/link";
import { getTimeDifference } from "@/lib/utils/index";
import LikeButton from "@/components/features/posts/like-button";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { ResultOf } from "gql.tada";
import { GET_POSTS } from "@/lib/api/api-feed";
import PostOptions from "@/components/features/posts/post-options";
import AvatarInfo from "@/components/shared/avatar-info";
import Attachments from "./attachments";

export interface PostProps {
  post: ResultOf<typeof GET_POSTS>["data"][number];
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const user = {
    id: post.user.id,
    name: post.user.name,
    image: post.user.image,
    time: getTimeDifference((post.created_at as string) || new Date()),
    privacy: post.privacy,
  };

  const session = useSessionContext();
  const userId = session.user?.id;

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <AvatarInfo details={user} />
        <PostOptions
          postId={post.id}
          isUser={userId === user.id}
          isBookmarked={!!post.isBookmarked?.aggregate?.count}
        />
      </div>

      <div className="mt-3">
        <p className="text-sm mb-3">{post.content}</p>

        {post.media_urls && post.media_urls.length > 0 && <Attachments attachments={post.media_urls} />}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <LikeButton
            postId={post.id}
            initialStatus={post.isLiked?.aggregate?.count ?? 0}
            initialLikes={post.total_likes?.aggregate?.count ?? 0}
          />

          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <Link href={`/posts/${post.id}`}>
              <MessageSquare className="h-4 w-4" />
              <span>{post.total_comments?.aggregate?.count ?? 0}</span>
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
    </div>
  );
};

export default PostCard;
