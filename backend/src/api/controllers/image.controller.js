import imageDao from '../dao/image.dao.js';
import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier'

class ImageController {
    getAllImages = async (req,res) => {
        try {
            const images = await imageDao.findAll()
            res.status(200).json({images});
    
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    };

    getImageById = async (req,res) => {
        try {
            const {id} = req.params
            const image = await imageDao.findById(id)
            res.status(200).json({image});
    
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    };

    uploadImage = async (req, res) => {
        try {
            if(!req.file) {
                return res.status(400).json({message : "Image not found"})
            }
            
            const streamUpload = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'images',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });

            const result = await streamUpload();            
            const uploadedImage = await imageDao.upload({name : req.file.originalname, url : result.secure_url});

            res.status(201).json({ message: "Image uploaded sucessfully", payload:  uploadedImage});

        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor", err: error.message });
        }
    };

}

export default new ImageController();


