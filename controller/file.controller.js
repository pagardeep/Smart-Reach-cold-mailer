import cloudinary from '../config/cloud.config.js';
import User from '../model/auth.model.js';
import File from '../model/file.model.js';
export const uploadFile = async(req, res) => {
    try {
        // console.log("req.file", req.file);
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'file is required.'
            });
        }
        // Process the uploaded file here
        const { filename } = req.body;
        if (!filename) {
            return res.status(400).json({
                success: false,
                message: 'file Name is required.'
            });
        }
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                    folder: "files",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            )
            stream.end(req.file.buffer);
        });
        const file = await File.create({
            filename,
            fileURL: result.secure_url,
            createdBy: req.user._id
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { files: file._id }
        });

        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully.',
            file
        });

    } catch (error) {
        console.log(error);
        console.error('Error uploading file:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};