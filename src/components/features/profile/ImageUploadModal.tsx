import Modal from 'react-modal';

type UploadModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  previewUrl: string | null;
  handleUpload: () => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ImageUploadModal = ({ isOpen, onRequestClose, previewUrl, handleUpload }: UploadModalProps) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Confirm Image Upload" style={customStyles}>
    <div className="p-8 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Confirm Image Upload</h2>
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Selected" className="w-auto h-64 rounded-lg shadow-md" />
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition">
          Cancel
        </button>

        <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Upload
        </button>
      </div>
    </div>
  </Modal>
);

export default ImageUploadModal;