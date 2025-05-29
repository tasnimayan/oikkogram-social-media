"use client";

import { DELETE_POST, RECOVER_POST_FROM_TRASH } from "@/lib/api/api-feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useFetchGql } from "@/lib/api/graphql";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

const TrashOptions = ({ postId }: { postId: number }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const queryClient = useQueryClient();

  const recoverPost = useMutation({
    mutationFn: async () =>
      useFetchGql(RECOVER_POST_FROM_TRASH, {
        id: postId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-posts", userId] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () =>
      useFetchGql(DELETE_POST, {
        id: postId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-posts", userId] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleDelete = async () => {
    deletePostMutation.mutate();
  };
  const handleRecover = async () => {
    recoverPost.mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer gap-2" asChild>
          <Button variant="ghost" onClick={handleRecover} className=" inline-block hover:bg-green-100 w-full py-1">
            Recover post
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={handleDelete} className="hover:bg-red-200 w-full py-1">
            Delete post
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrashOptions;
