"use client";

import { FaRegCommentAlt } from "react-icons/fa";
import AvatarBox from "./AvatarBox";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import LikeButton from "./social/like-button";
import dynamic from "next/dynamic";
import BookmarkButton from "./social/BookmarkButton";
const CommentSection = dynamic(() => import("./social/CommentSection"));
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getPostDetails } from "@/lib/queries";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import PostOptions from "./menu/PostOptions";

// Functionl for Fetching post details
const fetchPostDetails = async (postId: string | number, userId: string | undefined) => {
  if (!postId || !userId) toast.error("Invalid parameter!");
  const { data } = await fetchGraphql(getPostDetails, { post_id: postId, user_id: userId });
  return data.post;
};

const PostDetails = () => {
  const params = useParams();
  const postId = params.postId as string | number;
  const { user } = useSessionContext();
  const userId = user?.id;

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post-details", postId],
    queryFn: () => fetchPostDetails(postId, user?.id),
    enabled: !!postId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post details</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const userAvatar = {
    ...post.user,
    time: new Date(post.created_at).toDateString().slice(4),
    privacy: post.privacy,
  };

  return (
    <div className="bg-white rounded-lg w-full space-y-4 p-8">
      {/* User avatar */}
      <div className="flex justify-between">
        <AvatarBox details={userAvatar} />
        {userId === userAvatar.id && <PostOptions postId={post.id} />}
      </div>

      {/* Content details */}
      <div>
        <p className="text-sm leading-6 text-gray-700 text-arial">{post.content}</p>
      </div>

      {/* Reaction and comments */}
      <div className="flex justify-between pt-4 border-t text-gray-500 text-xs">
        <LikeButton postId={post.id} initialStatus={post.isLiked?.aggregate.count} initialLikes={post.total_likes?.aggregate.count} />
        <div className="flex items-center cursor-pointer">
          <FaRegCommentAlt className="mr-2 text-lg" />
          <span>Comments</span>
        </div>
        <BookmarkButton postId={post.id} initialStatus={post.isBookmarked?.aggregate.count} />
      </div>
      {/* All comments */}
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostDetails;
