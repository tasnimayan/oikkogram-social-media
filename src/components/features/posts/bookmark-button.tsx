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

  const QUERY = bookmarked ? UNSET_BOOKMARK : SET_BOOKMARK;

  const { mutate } = useMutation({
    mutationKey: [QK.POST, "BOOKMARK", { postId }],
    mutationFn: () => useFetchGql(QUERY, { post_id: postId }),
    onSuccess: () => toast.success("Post Deleted"),
    onError: () => {
      toast.error("Could not delete post!");
    },
  });

  const handleBookmark = async () => {
    setBookmarked(!bookmarked);
    mutate();
  };

  return (
    <Button variant="ghost" size="auto" onClick={handleBookmark} className="px-2 py-1.5 rounded-sm font-normal w-full text-start justify-start">
      {bookmarked ? <Bookmark className="size-4" color="#f87171" fill="#f87171" /> : <Bookmark className="size-4" />}
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
};

export default BookmarkButton;
