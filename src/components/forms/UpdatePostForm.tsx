"use client";
import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { updatePost } from "@/lib/queries";
import { PostType } from "@/lib/Interface";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../buttons/Button";

const UpdatePostForm = ({ data }: { data: PostType }) => {
  const router = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      privacy: data.privacy,
      content: data.content,
    },
  });
  const queryClient = useQueryClient();

  const postId = data.id;

  const {mutate,isPending} = useMutation({
    mutationFn: async (variables: { id: number|string; content: string; privacy: string }) => {
      return await fetchGraphql(updatePost, variables);
    },
    onSuccess: (response) =>{
      if (response.errors || !response.data.post) {
        return toast.error("Failed to update post");
      }
      toast.success("Post Updated");
      reset();
      queryClient.invalidateQueries(["posts"]);
      router.replace("/");
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      toast.error("Failed to update post");
    }
  })

  const onSubmit = async (data: { content: string; privacy: string }) => {
    let variables = {
      id: postId,
      content: data.content,
      privacy: data.privacy,
    };
    mutate(variables);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-1">
        <label htmlFor="privacy" className="text-sm mr-2">
          Privacy
        </label>
        <select
          {...register("privacy")}
          id="privacy"
          className="border rounded text-sm px-2 py-1 "
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <textarea
        {...register("content", { required: true })}
        placeholder="What's on your mind?"
        rows={8}
        className="w-full border-none focus:outline-none mt-2 bg-gray-50 rounded-lg"
      />

      <div className="flex gap-2 border rounded px-4 py-1 justify-end mt-2">
        <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
          <CiImageOn />
        </span>
      </div>
      <Button isPending={isPending} type="submit">Post</Button>

    </form>
  );
};

export default UpdatePostForm;
