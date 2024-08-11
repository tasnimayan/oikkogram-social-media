// Unused


import { useState, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { changeProfileImage } from "@/lib/queries";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";

const useFileUpload = () => {
  const { user } = useSessionContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: async (variables: { user_id: string | undefined; image: string }) => {
      return await fetchGraphql(changeProfileImage, variables);
    },
    onSuccess: (response) => {
      if (response.errors) {
        return toast.error("Could not change profile");
      }
      toast.success("Post created successfully");
      setSelectedFile(null);
      setPreviewUrl(null);
      queryClient.invalidateQueries({ queryKey: ["user-profile", user?.id] });
    },
  });

  const handleUpload = useCallback(async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        try {
          const response = await axios.post("/api/v1/upload", { file: reader.result });
          const imageUrl = response.data.url;
          mutate({ user_id: user?.id, image: imageUrl });
        } catch (uploadError) {
          toast.error("Error uploading image");
        }
      };
    }
  }, [selectedFile, mutate, user?.id]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    selectedFile,
    previewUrl,
    fileInputRef,
    handleUpload,
    handleFileChange,
    handleClick,
  };
};

export default useFileUpload;