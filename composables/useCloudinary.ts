export const uploadImage = async (file: File) => {
  let imgUrl = "";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_upload_preset"); // Replace with your actual preset

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doqwzxenw/image/upload", // Your Cloudinary URL
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    imgUrl = data.secure_url; // Cloudinary's hosted URL for the uploaded image
    console.log("Uploaded image URL:", imgUrl);
  } catch (err) {
    console.error("Error uploading image:", err);
  }

  return imgUrl;
};
