"use client";

import { ImCancelCircle } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { FormProvider, useForm } from "react-hook-form";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { createPost } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Users, Lock, X } from "lucide-react";
import { PostAssistant } from "../home/PostAssistant";
import Select, { SelectOption } from "../ui/Select";
import { ImageUploader } from "../home/ImageUploader";
import { postFormSchema, PostSchemaType } from "@/lib/schemas/createPostSchema";

interface PostCreateModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

type PrivacyTypes = "public" | "friends" | "private";
const privacyOptions: SelectOption[] = [
  { value: "public", label: "Public", icon: <Globe className="h-4 w-4 text-green-500" /> },
  { value: "friends", label: "Friends", icon: <Users className="h-4 w-4 text-blue-500" /> },
  { value: "private", label: "Only me", icon: <Lock className="h-4 w-4 text-gray-500" /> },
];

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="relative border-b">
      <h4 className="text-center text-lg font-semibold py-4">{title}</h4>
      <button
        className="absolute top-4 right-4 text-red-600 text-xl w-5 h-5 hover:opacity-80 transition-opacity"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X />
      </button>
    </div>
  );
};

const CreatePostModal: React.FC<PostCreateModalProps> = ({ modalRef }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<PostSchemaType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      privacy: "public",
      content: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: { content: string; privacy: string; files_url?: [string] }) => {
      return await fetchGraphql(createPost, variables);
    },
    onSuccess: (response) => {
      if (response.errors) {
        return toast.error("Could not upload post. Please try again.");
      }
      toast.success("Post created successfully");
      handleReset();
    },
    onError: () => {
      toast.error("An error occurred while creating the post");
    },
  });
  const handleReset = () => {
    reset();
    setSelectedFile(null);
    setPreviewUrl(null);
    if (modalRef.current) {
      modalRef.current.open = false;
    }
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const response = await axios.post("/api/v1/upload", {
            file: reader.result,
          });
          resolve(response.data.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: PostSchemaType) => {
    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const variables = {
        content: data.content,
        privacy: data.privacy,
        ...(imageUrl && { files_url: [imageUrl] as [string] }),
      };

      mutate(variables);
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <dialog className="absolute top-0 left-0 w-full h-screen bg-black/40 z-50 backdrop-blur-sm" ref={modalRef}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="relative w-full min-w-[28rem] max-w-3xl transition-all bg-white border rounded-xl p-4">
          <div>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ModalHeader title="Create Post" onClose={handleReset} />
                <div className="flex items-center gap-4">
                  <label className="block text-sm font-medium text-gray-700">Privacy</label>
                  <div className="w-36">
                    <Select
                      options={privacyOptions}
                      value={form.watch("privacy")}
                      onChange={(value) => form.setValue("privacy", value as PrivacyTypes)}
                      placeholder="Select privacy"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    {...register("content")}
                    placeholder="What's on your mind?"
                    rows={8}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                </div>
                <PostAssistant />

                <ImageUploader previewUrl={previewUrl} onChange={handleFileChange} onRemove={handleRemoveImage} />

                <div className="flex justify-end">
                  <Button isLoading={isPending} type="submit" className="px-6 w-full">
                    {isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreatePostModal;
