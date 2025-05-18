"use client";

import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Users, Lock, X, Loader2 } from "lucide-react";
import { PostAssistant } from "../features/posts/post-assistant";
import { ImageUploader } from "../features/posts/image-uploader";
import { postFormSchema, PostSchemaType } from "@/lib/schemas/createPostSchema";
import { Button } from "../ui/button";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFetchGql } from "@/lib/api/graphql";
import { CREATE_POST } from "@/lib/api/api-feed";
import { VariablesOf } from "gql.tada";
import { QK } from "@/lib/constants/query-key";

interface PostCreateFormProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

const privacyOptions = [
  {
    value: "public",
    label: "Public",
    icon: <Globe className="h-4 w-4 text-green-500" />,
  },
  {
    value: "friends",
    label: "Friends",
    icon: <Users className="h-4 w-4 text-blue-500" />,
  },
  {
    value: "private",
    label: "Only me",
    icon: <Lock className="h-4 w-4 text-gray-500" />,
  },
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

const PostCreateForm: React.FC<PostCreateFormProps> = ({ modalRef }) => {
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
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: VariablesOf<typeof CREATE_POST>) =>
      useFetchGql(CREATE_POST, variables),
    onSuccess: (response) => {
      if (!response.data?.id) {
        return toast.error("Could not create post. Please try again.");
      }
      toast.success("Post created successfully");
      handleReset();
      qc.invalidateQueries({ queryKey: [QK.POSTS] });
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
        ...(imageUrl && { media_urls: [imageUrl] as [string] }),
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

  const shouldPost = !!form.watch("content") && !isPending;

  return (
    <dialog
      className="absolute top-0 left-0 w-full h-screen bg-black/40 z-50 backdrop-blur-sm"
      ref={modalRef}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="relative w-full min-w-[28rem] max-w-3xl transition-all bg-white border rounded-xl p-4">
          <div>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ModalHeader title="Create Post" onClose={handleReset} />
                <div className="flex items-center gap-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Privacy
                  </label>
                  <div className="w-36">
                    <Select defaultValue="public">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select privacy" />
                      </SelectTrigger>
                      <SelectContent>
                        {privacyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <textarea
                    {...register("content")}
                    placeholder="What's on your mind?"
                    rows={8}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <PostAssistant />

                <ImageUploader
                  previewUrl={previewUrl}
                  onChange={handleFileChange}
                  onRemove={handleRemoveImage}
                />

                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="px-6 w-full border"
                    disabled={shouldPost}
                  >
                    {isPending && <Loader2 className="animate-spin" />}
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

export default PostCreateForm;
