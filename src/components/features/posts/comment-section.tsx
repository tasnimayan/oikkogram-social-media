"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_POST_COMMENTS, INSERT_COMMENT } from "@/lib/api/api-feed";
import toast from "react-hot-toast";
import { UserType } from "@/lib/interfaces";
import { Avatar } from "../../ui/avatar";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentType {
  user: UserType;
  content: string;
  id: number;
  created_at: string;
}

const CommentSection = ({ postId }: { postId: number | string }) => {
  const [newComment, setNewComment] = useState("");
  const qc = useQueryClient();

  const { data: commentsData, isLoading } = useQuery({
    queryKey: [QK.COMMENTS, { postId }],
    queryFn: () => useFetchGql(GET_POST_COMMENTS, { post_id: +postId }),
    select: response => response.data,
    enabled: !!postId,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: async (variables: { post_id: number; content: string }) => useFetchGql(INSERT_COMMENT, variables),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QK.COMMENTS, { postId }] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleAddComment = async () => {
    setNewComment(newComment.trim());
    if (newComment) {
      const variables = { post_id: +postId, content: newComment };
      addComment(variables);
      setNewComment("");
    }
  };
  if (isLoading) return <Loading />;
  if (!commentsData) return null;

  return (
    <div className="flex flex-col mt-4 border-t pt-4 h-full">
      <h4 className="text-lg font-semibold text-gray-400 mb-2">Comments</h4>
      <div className="flex flex-col gap-y-2 flex-1">
        {commentsData.map((comment, index) => (
          <div key={index} className="mb-2 flex gap-x-2">
            <Avatar src={comment.user?.image} />
            <div>
              <p className="font-semibold text-xs">{comment.user?.name}</p>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-x-2">
        <Textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="border p-2 rounded w-full h-input"
          placeholder="Add a comment..."
        />
        <Button variant="outline" onClick={handleAddComment} className="h-input">
          <SendHorizontal className="h-full" />
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
