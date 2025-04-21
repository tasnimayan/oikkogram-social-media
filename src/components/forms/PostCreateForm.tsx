"use client";

import { ImCancelCircle } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { Form, useForm, useFormContext, useWatch } from "react-hook-form";
import fetchGraphql from "@/lib/fetchGraphql";
import toast from "react-hot-toast";
import { createPost } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../buttons/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuSparkles } from "react-icons/lu";
import { HiOutlineRefresh, HiOutlineHashtag } from "react-icons/hi";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { Loader2, Sparkles } from "lucide-react";

interface PostCreateModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}
const postSchema = z.object({
  privacy: z.enum(["public", "private"]),
  content: z.string().min(1, "Post content is required").max(1000, "Post is too long"),
});

type PostFormData = z.infer<typeof postSchema>;

const ImagePreview = ({ url }: { url: string }) => (
  <div className="mt-1">
    <img src={url} alt="Selected" className="max-h-40 mx-auto object-cover rounded" />
  </div>
);

const ImageUploadButton = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="relative flex gap-2 border rounded px-4 py-1 justify-end mt-2">
    <input type="file" accept="image/*" onChange={onChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
    <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
      <CiImageOn />
    </span>
  </div>
);

const CreatePostModal: React.FC<PostCreateModalProps> = ({ modalRef }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
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

  const onSubmit = async (data: PostFormData) => {
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
    <dialog className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-50" ref={modalRef}>
      <div className="w-full  h-full flex justify-center items-center">
        <div className="bg-white relative border shadow rounded-lg min-w-[28rem] max-w-3xl px-4 py-6">
          <button
            className="absolute top-4 right-4 text-red-600 text-2xl w-5 h-5 hover:opacity-80 transition-opacity"
            onClick={handleReset}
            aria-label="Close modal"
          >
            <ImCancelCircle />
          </button>

          <div>
            <h4 className="text-center text-lg font-semibold mb-4">Create Post</h4>
            <hr className="mb-4" />

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center">
                  <label htmlFor="privacy" className="text-sm mr-2 font-medium">
                    Privacy
                  </label>
                  <select {...register("privacy")} id="privacy" className="border rounded text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
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

                {previewUrl && <ImagePreview url={previewUrl} />}
                <ImageUploadButton onChange={handleFileChange} />

                <Button isLoading={isPending} type="submit">
                  {isPending ? "Posting..." : "Post"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

type ToneType = "casual" | "professional" | "friendly" | "enthusiastic" | "formal";
const toneOptions: { value: ToneType; label: string; description: string }[] = [
  { value: "casual", label: "Casual", description: "Relaxed and conversational" },
  { value: "professional", label: "Professional", description: "Polished and business-like" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable" },
  { value: "enthusiastic", label: "Enthusiastic", description: "Excited and energetic" },
  { value: "formal", label: "Formal", description: "Serious and traditional" },
];

export function PostAssistant() {
  const [result, setResult] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useFormContext<PostFormData>();

  const handleGenerate = async (type: string) => {
    const content = form.getValues("content");
    if (!content) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/post-assistant", {
        text: content,
        promptType: type,
      });
      setResult(data.result);
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 border rounded space-y-3">
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          AI Enhancements
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={() => handleGenerate("generate")} disabled={loading} isLoading={loading} variant="outline">
            <LuSparkles />
            Generate
          </Button>

          <Button onClick={() => handleGenerate("improve")} disabled={loading} variant="outline">
            <HiOutlineRefresh />
            Improve
          </Button>

          <Button onClick={() => handleGenerate("hashtags")} disabled={loading} variant="outline">
            <HiOutlineHashtag />
            Hashtags
          </Button>

          <Button onClick={() => handleGenerate("summarize")} disabled={loading} variant="outline">
            <MdSwitchAccessShortcut />
            Summarize
          </Button>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <label className="block text-sm font-medium text-gray-700">Select Tone</label>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone.value}
              onClick={() => setSelectedTone(tone.value)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                selectedTone === tone.value
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
              title={tone.description}
            >
              {tone.label}
            </button>
          ))}
        </div>
        {selectedTone && <p className="text-xs text-gray-500 mt-1">{toneOptions.find((t) => t.value === selectedTone)?.description}</p>}
      </div>
      {loading ? <Loader2 className="size-10 animate-spin" /> : result && <div className="p-2 bg-gray-100 rounded">{result}</div>}
    </div>
  );
}

export default CreatePostModal;
