"use client";

// This component is responsible for creating posts for user. Shows up in a modal
import { ImCancelCircle } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { createPost } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./buttons/Button";

const CreatePostModal = ({ modalRef }: { modalRef?: any }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      privacy: "public",
      content: "",
    },
  });
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: async (variables) => {
      return await fetchGraphql(createPost, variables);
    },
    onSuccess: (response) => {
      if (response.errors) {
        return toast.error(response.errors[0].extensions.code);
      }
      toast.success("Post created successfully");
      reset();
      modalRef.current.open = false;

      queryClient.invalidateQueries(["posts"]);
    },
  });

  const onSubmit = async (data) => {
    const variables = {
      content: data.content,
      privacy: data.privacy ?? "public",
    };
    mutate(variables);
  };

  return (
    <dialog
      className=" absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-50"
      ref={modalRef}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white relative border shadow rounded-lg w-[28rem] px-2 py-4">
          <button
            className="absolute top-4 right-4 text-red-600 text-2xl w-5 h-5 "
            onClick={() => {
              modalRef.current.open = false;
            }}
          >
            <ImCancelCircle />
          </button>
          <div>
            <h4 className="text-center text-lg ">Create Post</h4>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="privacy" className="text-sm mr-2">
                  Privacy
                </label>
                <select
                  {...register("privacy")}
                  id="privacy"
                  className="border rounded text-sm px-2 py-1"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <textarea
                {...register("content", { required: true })}
                placeholder="What's on your mind?"
                rows={8}
                className="w-full border-none focus:outline-none"
              />

              <div className="flex gap-2 border rounded px-4 py-1 justify-end mt-2">
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
                  <CiImageOn />
                </span>
              </div>
              <Button isPending={isPending} type="submit">Post</Button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreatePostModal;
