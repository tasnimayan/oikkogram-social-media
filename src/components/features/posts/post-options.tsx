"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import BookmarkButton from "../../social/bookmark-button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFetchGql } from "@/lib/api/graphql";
import { TRASH_POST } from "@/lib/api/api-feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";

const PostOptions = ({ postId, isUser, isBookmarked }: { postId: number; isUser: boolean; isBookmarked?: boolean }) => {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: [QK.POST, "TRASH", { postId }],
    mutationFn: () => useFetchGql(TRASH_POST, { id: postId }),
    onSuccess: () => {
      toast.success("Post Deleted");
      qc.invalidateQueries({ queryKey: [QK.POSTS] });
    },
    onError: () => {
      toast.error("Could not delete post!");
    },
  });

  const handleDelete = async () => {
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {isUser && (
          <>
            <DropdownMenuItem className="cursor-pointer gap-2" asChild>
              <Link href={`/post/${postId}/edit`}>
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-red-600" onClick={handleDelete} disabled={isPending}>
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem className="cursor-pointer gap-2" asChild>
          <BookmarkButton postId={postId} initialStatus={isBookmarked} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
