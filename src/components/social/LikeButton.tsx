
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import fetchGraphql from "@/lib/fetchGraphql";
import { setLikedPost, unsetLikedPost } from "@/lib/queries";

const LikeButton = ({ postId, initialStatus, initialLikes=0 }: { postId: number | string; initialStatus?:number | boolean; initialLikes?:number }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialStatus);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      await fetchGraphql(setLikedPost,{post_id:postId});
    } else {
      setLiked(false);
      setLikes(likes - 1);
      await fetchGraphql(unsetLikedPost,{post_id:postId});
    }
  };

  return (
    <div onClick={handleLike} className="cursor-pointer flex items-center">
      {liked ? <FaHeart className="text-red-500 text-lg" /> : <FaRegHeart className="text-lg" />}
      <span className="ml-2">{likes ?? ''} {likes>1? 'Likes':'Like'}</span>
    </div>
  );
};

export default LikeButton;
