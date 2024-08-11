
'use client'
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import fetchGraphql from "@/lib/fetchGraphql";
import { changeProfileImage } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import ImageUploadModal from "../profile/ImageUploadModal";

const PlusButton = () => {
  const {user} = useSessionContext()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (variables: {
      user_id:string | undefined
      image: string;
    }) => {
      return await fetchGraphql(changeProfileImage, variables);
    },
    onSuccess: (response) => {
      if (response.errors) {
        return toast.error("Could not change profile");
      }
      toast.success("Profile picture changed");

      setSelectedFile(null);
      setPreviewUrl(null);
      queryClient.invalidateQueries({ queryKey: ["user-profile", user?.id] });
    },
  });

  const handleUpload = async () => {
    let imageUrl = null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        try {
          console.log(reader.result);
          const response = await axios.post("/api/v1/upload", {
            file: reader.result,
          });
          imageUrl = response.data.url;
        } catch (uploadError) {
          toast.error("Error uploading image");
          return;
        }

        const variables = {
          user_id: user?.id,
          image: imageUrl as string,
        };
        mutate(variables);
      };
    }
  };


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setModalIsOpen(true)
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      console.log(e.target.files)
    }
  };

  return (
    <div 
      className="bg-gray-300 hover:bg-blue-500 text-white p-2 rounded-full border border-white shadow-md"
      onClick={handleClick}
    >
      <FaPlus className="text-sm md:text-lg"/>
      <input 
        id="upload" 
        type="file" 
        accept="image/*" 
        className="hidden" 
        multiple={false}
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      {selectedFile && (
        <ImageUploadModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          previewUrl={previewUrl}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default PlusButton;