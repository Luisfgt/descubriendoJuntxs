import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL is not defined in the environment variables');
}
const url = new URL(cloudinaryUrl);

cloudinary.config({
    cloud_name: url.hostname,
    api_key: url.username,
    api_secret: url.password,
    secure: true
});

export const uploadController = async (req: Request, res: Response) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {

            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        console.log(req.file.path);
        return res.json({ url: result.secure_url });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};