import axios from "axios";

export const uploadSingleFile = async (file: File): Promise<string | null> => {
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
