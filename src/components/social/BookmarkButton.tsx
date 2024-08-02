// LikeButton.tsx
import { useState } from "react";
import { FaBookmark, FaRegBookmark  } from "react-icons/fa6";
import fetchGraphql from "@/lib/fetchGraphql";
import { setBookmark, unsetBookmark } from "@/lib/queries";

const BookmarkButton = ({ postId, initialStatus=0 }: { postId: number | string; initialStatus: number|boolean}) => {
  const [bookmarked, setBookmarked] = useState(initialStatus);

  const handleBookmark = async () => {
    if (!bookmarked) {
      setBookmarked(true);
      await fetchGraphql(setBookmark,{post_id:postId});
    } else {
      setBookmarked(false);
      await fetchGraphql(unsetBookmark,{post_id:postId});
    }
  };

  return (
    <div onClick={handleBookmark} className="cursor-pointer flex items-center">
      {bookmarked ? <FaBookmark className="text-red-400 text-lg" /> : <FaRegBookmark className="text-lg" />}
    </div>
  );
};

export default BookmarkButton;
