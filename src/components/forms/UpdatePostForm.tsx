"use client";

import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GET_POST_BY_ID } from "@/lib/api/queries";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResultOf, VariablesOf } from "gql.tada";
import { Button } from "../ui/button";
import { UPDATE_POST } from "@/lib/api/api-feed";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";

type PostType = NonNullable<ResultOf<typeof GET_POST_BY_ID>["data"]>;

const UpdatePostForm = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      privacy: post.privacy ?? "public",
      content: post.content || "",
    },
  });
  const qc = useQueryClient();

  const postId = post.id;

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: VariablesOf<typeof UPDATE_POST>) => useFetchGql(UPDATE_POST, variables),
    onSuccess: () => {
      toast.success("Post Updated");
      reset();
      qc.invalidateQueries({ queryKey: [QK.POSTS, QK.POST] });
      router.replace("/");
    },
    onError: () => toast.error("Failed to update post"),
  });

  const onSubmit = async (post: { content: string; privacy: string }) => {
    let variables = {
      id: postId,
      content: post.content,
      privacy: post.privacy,
    };
    mutate(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-1">
        <label htmlFor="privacy" className="text-sm mr-2">
          Privacy
        </label>
        <select {...register("privacy")} id="privacy" className="border rounded text-sm px-2 py-1 ">
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
      <Button disabled={isPending} type="submit">
        Post
      </Button>
    </form>
  );
};

export default UpdatePostForm;
