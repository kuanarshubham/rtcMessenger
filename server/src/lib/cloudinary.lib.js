import { v2 as cloudinary } from 'cloudinary';
import uniqid from 'uniqid';

const uploadPictureToCloudinary = async (filePath) => {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            filePath, {
            public_id: uniqid(),
        }
        )
        .catch((error) => {
            console.log(error);
        });

    return uploadResult;
}

export default uploadPictureToCloudinary;