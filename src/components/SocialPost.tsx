// Shows Post Details in Card

import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import AvatarBox from "./AvatarBox";
import { useSession } from "next-auth/react";
import { PostType } from "@/lib/Interface";

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
    time: new Date(post.created_at).toDateString().slice(4),
    privacy: post.privacy,
  };

  const { data: session } = useSession();
  const userId = session.user?.id;

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
        <p className="text-sm leading-6 text-gray-700 text-arial">
          {post.content}
        </p>
      </div>

      {/* Reaction and comments */}
      <div className="flex justify-between pt-4 border-t text-gray-500 text-xs">
        <div>
          <FaRegHeart className="inline-block me-2 text-lg" /> 1.2K
        </div>
        <div>
          <FaRegCommentAlt className="inline-block me-2 text-lg" /> 220 comments
        </div>
        <div className="inline-block text-2xl text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 40 40"
            fill="currentColor"
            stroke="#000"
          >
            <path d="M20 31.441L8.5 37.191 8.5 2.5 31.5 2.5 31.5 37.191z"></path>
            <path d="M31,3v33.382l-10.553-5.276L20,30.882l-0.447,0.224L9,36.382V3H31 M32,2H8v36l12-6l12,6V2L32,2z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SocialPost;
