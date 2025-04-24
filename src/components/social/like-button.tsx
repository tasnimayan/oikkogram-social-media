import { useState } from "react";
import fetchGraphql from "@/lib/fetchGraphql";
import { setLikedPost, unsetLikedPost } from "@/lib/queries";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const LikeButton = ({
  postId,
  initialStatus,
  initialLikes = 0,
}: {
  postId: number | string;
  initialStatus?: number | boolean;
  initialLikes?: number;
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialStatus);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      await fetchGraphql(setLikedPost, { post_id: postId });
    } else {
      setLiked(false);
      setLikes(likes - 1);
      await fetchGraphql(unsetLikedPost, { post_id: postId });
    }
  };

  return (
    <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={handleLike}>
      <Heart className={`size-4 ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} fill={liked ? "#ef4444" : "none"} />
      <span className="sr-only sm:not-sr-only sm:inline-block">{likes ?? "0"}</span>
    </Button>
  );
};

export default LikeButton;
