"use client";
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getComments, insertComment } from "@/lib/api/queries";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { UserType } from "@/lib/Interface";
import { Avatar } from "../../ui/avatar";

interface CommentType {
  user: UserType;
  content: string;
  id: number;
  created_at: string;
}

const CommentSection = ({ postId }: { postId: number | string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const variables = { post_id: postId };
      const response = await fetchGraphql(getComments, variables);
      if (response.errors) return toast.error("Something went wrong!");

      setComments(response.data.comments);
    },
  });

  const handleAddComment = async () => {
    setNewComment(newComment.trim());
    if (newComment) {
      const variables = { post_id: postId, content: newComment };
      const response = await fetchGraphql(insertComment, variables);
      if (response.errors) return toast.error("Something went wrong!");
      setComments([...comments, response.data.comments]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-lg font-semibold text-gray-400 mb-2">Comments</h4>
      <div className="flex flex-col gap-y-2">
        {comments?.map((comment, index) => (
          <div key={index} className="mb-2 flex gap-x-2">
            <Avatar src={comment.user.image ?? ""} />
            <div>
              <p className="font-semibold text-xs">{comment.user.name}</p>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="text-nowrap bg-blue-500 text-white px-4 rounded ms-2">
          <LuSendHorizonal className="h-full" />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
