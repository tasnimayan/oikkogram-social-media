"use client";
import fetchGraphql from "@/lib/fetchGraphql";
import { deletePost, recoverPost } from "@/lib/api/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

const TrashOptions = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const queryClient = useQueryClient();

  const recoverPostMutation = useMutation({
    mutationFn: async () => {
      const variables = {
        id: postId,
      };
      try {
        const response = await fetchGraphql(recoverPost, variables);
        if (response.errors) toast.error("Could not recover post");
        toast.success("Post Recovered");
        return true;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-posts", userId] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      const variables = {
        id: postId,
      };
      try {
        const response = await fetchGraphql(deletePost, variables);
        if (response.errors) toast.error("Could not delete post");
        toast.success("Post Deleted");
        return true;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-posts", userId] });
    },
  });

  const handleDelete = async () => {
    deletePostMutation.mutate();
  };
  const handleRecover = async () => {
    recoverPostMutation.mutate();
  };
  return (
    <div className="relative">
      <BsThreeDots className="cursor-pointer" onClick={() => setOpen(!open)} />
      <div className={`absolute top-1/2 right-0 bg-white border rounded-lg text-sm w-28 py-2 text-center ${open ? "" : "hidden"}`}>
        <ul>
          <button onClick={handleRecover} className=" inline-block hover:bg-green-100 w-full py-1">
            Recover post
          </button>
          <button onClick={handleDelete} className="hover:bg-red-200 w-full py-1">
            Delete post
          </button>
        </ul>
      </div>
    </div>
  );
};

export default TrashOptions;
