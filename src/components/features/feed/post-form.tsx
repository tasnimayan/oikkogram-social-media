"use client";

import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Users, Lock } from "lucide-react";
import { PostAssistant } from "../posts/post-assistant";
import { ImageUploader } from "../posts/image-uploader";
import { postFormSchema, PostSchemaType } from "@/lib/schemas/createPostSchema";
import { Button } from "../../ui/button";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useFetchGql } from "@/lib/api/graphql";
import { CREATE_POST, GET_POST_BY_ID } from "@/lib/api/api-feed";
import { ResultOf, VariablesOf } from "gql.tada";
import { QK } from "@/lib/constants/query-key";
import { uploadSingleFile } from "@/lib/utils/file-upload";
import { Loading } from "../../ui/loading";
import { Textarea } from "../../ui/textarea";
import { useUpdatePost } from "@/lib/hooks/use-update-post";

type PostType = NonNullable<ResultOf<typeof GET_POST_BY_ID>["data"]>;

interface PostCreateFormProps {
  post?: PostType;
}

const PRIVACY_OPTIONS = [
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
type PrivacyType = "public" | "friends" | "private";

const PostForm: React.FC<PostCreateFormProps> = ({ post }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(post?.media_urls?.[0] || null);
  const queryClient = useQueryClient();

  const form = useForm<PostSchemaType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      privacy: (post?.privacy as PrivacyType) || "public",
      content: post?.content || "",
    },
  });

  const { register, handleSubmit, reset, setValue } = form;

  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: VariablesOf<typeof CREATE_POST>) => useFetchGql(CREATE_POST, variables),
    onSuccess: response => {
      if (!response.data?.id) {
        return toast.error("Could not create post. Please try again.");
      }
      toast.success("Post created successfully");
      qc.invalidateQueries({ queryKey: [QK.POSTS] });
      handleReset();
    },
    onError: () => {
      toast.error("An error occurred while creating the post");
    },
  });

  const { mutate: updatePost, isPending: isUpdatePending } = useUpdatePost();

  const handleReset = () => {
    reset();
    setSelectedFile(null);
    setPreviewUrl(null);
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

  const onSubmit = async (data: PostSchemaType) => {
    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadSingleFile(selectedFile);
      }

      const variables = {
        content: data.content,
        privacy: data.privacy,
        ...(imageUrl && { media_urls: [imageUrl, ...(post?.media_urls || [])] as [string] }),
      };

      if (post?.id) {
        updatePost({ postId: post.id, ...variables });
      } else {
        mutate(variables);
      }
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

  const isLoading = isPending || isUpdatePending;

  return (
    <div className="scroll-container grow">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2">
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">Privacy</label>
            <div className="w-36">
              <Select defaultValue="public">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select privacy" />
                </SelectTrigger>
                <SelectContent>
                  {PRIVACY_OPTIONS.map(option => (
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

          <Textarea {...register("content")} rows={4} placeholder="What's on your mind?" />

          <ImageUploader previewUrl={previewUrl} onChange={handleFileChange} onRemove={handleRemoveImage} />
          <PostAssistant onGenerate={text => setValue("content", text)} />

          <Button
            variant="ghost"
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            disabled={isLoading}
          >
            {isLoading && <Loading />}
            {post?.id ? "Update" : "Post"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostForm;
