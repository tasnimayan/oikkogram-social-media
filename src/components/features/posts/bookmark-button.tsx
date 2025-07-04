// LikeButton.tsx
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useFetchGql } from "@/lib/api/graphql";
import { SET_BOOKMARK, UNSET_BOOKMARK } from "@/lib/api/api-feed";
import { QK } from "@/lib/constants/query-key";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const BookmarkButton = ({ postId, initialStatus = false }: { postId: number; initialStatus?: boolean }) => {
  const [bookmarked, setBookmarked] = useState(initialStatus);

  const { mutate } = useMutation({
    mutationKey: [QK.POST, "BOOKMARK", { postId }],
    mutationFn: (isCurrentlyBookmarked: boolean) => {
      const QUERY = isCurrentlyBookmarked ? UNSET_BOOKMARK : SET_BOOKMARK;
      return useFetchGql(QUERY, { post_id: postId });
    },
    onSuccess: (_, isCurrentlyBookmarked) => setBookmarked(!isCurrentlyBookmarked),
    onError: () => toast.error("Could not update bookmark status!"),
  });

  const handleBookmark = () => {
    mutate(bookmarked);
  };

  return (
    <Button
      variant="ghost"
      size="auto"
      onClick={handleBookmark}
      className="px-2 py-1.5 rounded-sm font-normal w-full text-start justify-start"
    >
      {bookmarked ? <Bookmark className="size-4" color="#f87171" fill="#f87171" /> : <Bookmark className="size-4" />}
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
};

export default BookmarkButton;
