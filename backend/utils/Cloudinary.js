const cloudinary = require("cloudinary").v2;
const fs = require('fs');

exports.CloudinaryUploads = async (ImageUrlPath) => {
  try {
    // Configuration
    cloudinary.config({
      cloud_name: process.env.Cloudinary_cloud_name,
      api_key: process.env.Cloudinary_api_key,
      api_secret: process.env.Cloudinary_api_secret,
    });

    const uploadResult = await cloudinary.uploader.upload(ImageUrlPath, {
      resource_type: "auto",
    });

    return uploadResult;
  } catch (error) {
    if (fs.existsSync(ImageUrlPath)) {
      fs.unlinkSync(ImageUrlPath);
    }
    console.log(error.message);
  }
};
