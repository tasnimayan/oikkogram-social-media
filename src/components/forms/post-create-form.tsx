"use client";

import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Users, Lock } from "lucide-react";
import { PostAssistant } from "../features/posts/post-assistant";
import { ImageUploader } from "../features/posts/image-uploader";
import { postFormSchema, PostSchemaType } from "@/lib/schemas/createPostSchema";
import { Button } from "../ui/button";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useFetchGql } from "@/lib/api/graphql";
import { CREATE_POST } from "@/lib/api/api-feed";
import { VariablesOf } from "gql.tada";
import { QK } from "@/lib/constants/query-key";
import { uploadSingleFile } from "@/lib/utils/file-upload";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Loading } from "../ui/loading";
import { Textarea } from "../ui/textarea";

interface PostCreateFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

const PostCreateForm: React.FC<PostCreateFormProps> = ({ isOpen, onOpenChange }) => {
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

  const { register, handleSubmit, reset, setValue } = form;
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: VariablesOf<typeof CREATE_POST>) => useFetchGql(CREATE_POST, variables),
    onSuccess: response => {
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
    onOpenChange(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center h-4/5 max-w-2xl">
        <ScrollArea className="h-full">
          <div className="border-b mb-2">
            <h4 className="text-center text-lg font-semibold py-4">Create Post</h4>
          </div>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700">Privacy</label>
                <div className="w-36">
                  <Select defaultValue="public">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      {privacyOptions.map(option => (
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
                disabled={isPending}
              >
                {isPending && <Loading />}
                {isPending ? "Posting..." : "Post"}
              </Button>
            </form>
          </FormProvider>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateForm;
