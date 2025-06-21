import { Dialog, DialogContent } from "@/components/ui/dialog";

type UploadModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  previewUrl: string;
  handleUpload: () => void;
};

const ImageUploadModal = ({ isOpen, onRequestClose, previewUrl, handleUpload }: UploadModalProps) => (
  <Dialog open={isOpen} onOpenChange={onRequestClose}>
    <DialogContent className="flex flex-col items-center">
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Image Upload</h2>
        <div className="mb-4">
          <img src={previewUrl} alt="Selected" className="size-48 object-cover rounded-lg shadow-md" />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ImageUploadModal;
