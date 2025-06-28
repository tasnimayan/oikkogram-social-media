import { Dialog, DialogContent } from "@/components/ui/dialog";
import { uploadSingleFile } from "@/lib/utils/file-upload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { UPDATE_USER_PROFILE } from "@/lib/api/api-profile";
import { useQueryClient } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { ProfileVariables } from "./basic-info";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useModalState } from "@/lib/hooks/use-modal-state";
import { Camera } from "lucide-react";

const ImageUploadModal = ({ userId }: { userId: string }) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const { open, changeOpen } = useModalState();
  const [preview, setPreview] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(file);
      changeOpen(true);
    }
    // Reset file input value so the same file can be selected again
    e.target.value = "";
  };

  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: ProfileVariables) => useFetchGql(UPDATE_USER_PROFILE, variables),
    onSuccess: () => {
      toast.success("Profile picture changed");
      qc.invalidateQueries({ queryKey: [QK.PROFILE, userId] });
    },
    onError: () => toast.error("Could not update profile picture!"),
  });

  useEffect(() => {
    if (!preview) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(preview);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [preview]);

  const onSubmit = async () => {
    try {
      let imageUrl = null;
      if (preview) {
        imageUrl = await uploadSingleFile(preview);
      }
      if (!imageUrl) {
        toast.error("Error uploading image");
        return;
      }

      mutate({ userId, _set: { profile_photo_url: imageUrl } });
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <>
      <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition cursor-pointer overflow-hidden">
        <Camera size={20} className="text-muted-foreground" />
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>

      <Dialog open={open} onOpenChange={() => changeOpen(false)}>
        <DialogContent className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Confirm Image Upload</h2>
          <div className="mb-4">
            {objectUrl && (
              <img src={objectUrl} alt="Selected preview" className="size-48 object-cover rounded-lg shadow-md" />
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => changeOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={isPending}>
              {isPending && <Loading className="size-4" />}
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploadModal;
