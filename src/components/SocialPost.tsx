// Shows Post Details in Card

import { FaRegCommentAlt } from "react-icons/fa";
import AvatarBox from "./AvatarBox";
import { PostType } from "@/lib/Interface";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import LikeButton from "./social/LikeButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import BookmarkButton from "./social/BookmarkButton";
import Link from "next/link";
const CommentSection = dynamic(()=>import("./social/CommentSection"))

const SocialPost = ({
  post,
  OptionsComponent,
}: {
  post: PostType;
  OptionsComponent?: any;
}) => {
  const user = {
    id: post.user.id,
    name: post.user.name,
    image:post.user.image,
    time: new Date(post.created_at??'').toDateString().slice(4),
    privacy: post.privacy,
  };

  const session = useSessionContext();
  const userId = session.user?.id;

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-4 border">
      {/* User avatar */}
      <div className="flex justify-between">
        <AvatarBox details={user} />
        {userId === user.id && OptionsComponent && (
          <OptionsComponent postId={post.id} />
        )}
      </div>

      {/* Content details */}
      <div>
        <Link href={`/post/${post.id}`}>
          <p className="text-sm leading-6 text-gray-700 line-clamp-3">
            {post.content}
          </p>
        </Link>
      </div>

      {/* Reaction and comments */}
      <div className="flex justify-between pt-4 border-t text-gray-500 text-xs">
        <LikeButton postId={post.id} initialStatus={post.isLiked?.aggregate.count} initialLikes={post.total_likes?.aggregate.count}/>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <FaRegCommentAlt className="mr-2 text-lg" />
          <span>Comments</span>
        </div>
        <BookmarkButton postId={post.id} initialStatus={post.isBookmarked?.aggregate.count}/>
        
      </div>
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};

export default SocialPost;
