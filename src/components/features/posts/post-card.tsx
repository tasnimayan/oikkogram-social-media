import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share } from "lucide-react";
import Link from "next/link";
import { getTimeDifference } from "@/lib/utils/index";
import LikeButton from "@/components/features/posts/like-button";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import { ResultOf } from "gql.tada";
import { GET_POSTS } from "@/lib/api/api-feed";
import PostOptions from "@/components/features/posts/post-options";

export interface PostProps {
  post: ResultOf<typeof GET_POSTS>["data"][number];
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const user = {
    id: post.user.id,
    name: post.user.name,
    image: post.user.image,
    privacy: post.privacy,
  };

  const session = useSessionContext();
  const userId = session.user?.id;

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || "profile avatar"} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <Link href={`/profile/${user.id}`} className="font-medium hover:underline">
                {user.name}
              </Link>
              {/* {category && <span className="rounded-full bg-secondary/10 text-secondary text-xs px-2 py-0.5">{category}</span>} */}
            </div>

            <div className="text-muted-foreground text-xs flex items-center gap-1">
              {getTimeDifference((post.created_at as string) || new Date())}
              {/* {location && (
                <>
                  <span>•</span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-0.5" />
                    {location}
                  </span>
                </>
              )} */}
            </div>
          </div>
        </div>

        <PostOptions postId={post.id} isUser={userId === user.id} isBookmarked={!!post?.isBookmarked.aggregate?.count} />
      </div>

      <div className="mt-3">
        <p className="text-sm mb-3">{post.content}</p>

        {post.media_urls?.length && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img src={post.media_urls[0] || ""} alt="Post content" className="w-full object-cover max-h-96" />
          </div>
        )}
      </div>

      {/* {showComments && <CommentSection postId={post.id} />} */}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <LikeButton postId={post.id} initialStatus={post.isLiked?.aggregate?.count ?? 0} initialLikes={post.total_likes?.aggregate?.count ?? 0} />

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
