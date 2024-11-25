import axios from "axios";

export const useCloudinary = () => {
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
      formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME!);

      const response = await axios.post(
        `CLOUDINARY_URL=cloudinary://<454913899919423>:<S0-c2X59DK9ul-5j30T9FeWfpNM>@doqwzxenw`,
        formData
      );

      return response.data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return {
    uploadImage,
  };
};
