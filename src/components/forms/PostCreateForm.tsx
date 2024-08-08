"use client";

import { ImCancelCircle } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { createPost } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../buttons/Button";
import { useState } from "react";
import axios from "axios";

const CreatePostModal = ({ modalRef }:{ modalRef?: any }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      privacy: "public",
      content: "",
    },
  });
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables:{content:string; privacy:string, files_url?:[string]}) => {
      return await fetchGraphql(createPost, variables);
    },
    onSuccess: (response) => {
      if (response.errors) {
        return toast.error("Could not upload post");
      }
      toast.success("Post created successfully");
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      modalRef.current.open = false;
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = async (data:{
    content: string;
    privacy: string;
  }) => {
    let imageUrl = null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        try {
          const response = await axios.post("/api/v1/upload", {
            file: reader.result,
          });
          imageUrl = response.data.url;
        } catch (uploadError) {
          toast.error("Error uploading image");
          return;
        }

        const variables = {
          content: data.content,
          privacy: data.privacy ?? "public",
          files_url:[imageUrl] as [string], // Add image URL to the variables
        };
        mutate(variables);
      };
    } else {
      const variables = {
        content: data.content,
        privacy: data.privacy ?? "public",
      };
      mutate(variables);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <dialog
      className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-50"
      ref={modalRef}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white relative border shadow rounded-lg w-[28rem] px-2 py-4">
          <button
            className="absolute top-4 right-4 text-red-600 text-2xl w-5 h-5"
            onClick={() => {
              modalRef.current.open = false;
            }}
          >
            <ImCancelCircle />
          </button>
          <div>
            <h4 className="text-center text-lg">Create Post</h4>
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

              {previewUrl && (
                <div className="mt-1">
                  <img src={previewUrl} alt="Selected" className="max-h-40 mx-auto" />
                </div>
              )}

              <div className="relative flex gap-2 border rounded px-4 py-1 justify-end mt-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
                  <CiImageOn />
                </span>
              </div>



              <Button isPending={isPending} type="submit">
                Post
              </Button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreatePostModal;
