import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { SET_LIKE, UNSET_LIKE } from "@/lib/api/api-feed";

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

  const { mutate } = useMutation({
    mutationKey: [QK.POST, "LIKE", postId],
    mutationFn: ({ like }: { like: boolean }) => useFetchGql(like ? SET_LIKE : UNSET_LIKE, { post_id: +postId }),
    onError: (error, variables) => {
      // Revert local state on error
      setLiked(prev => !prev);
      setLikes(prev => (variables.like ? prev - 1 : prev + 1));
    },
  });

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => (newLiked ? prev + 1 : prev - 1));

    mutate({ like: newLiked });
  };

  return (
    <Button variant="ghost" size="auto" className="flex items-center gap-1" onClick={handleLike}>
      <Heart className={`size-6 hover:text-red-500 ${liked ? "text-red-500" : ""}`} fill={liked ? "#ef4444" : "none"} />
      <span className="sr-only sm:not-sr-only sm:inline-block">{likes}</span>
    </Button>
  );
};

export default LikeButton;
