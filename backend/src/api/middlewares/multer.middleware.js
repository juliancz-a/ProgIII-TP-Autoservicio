import multer from 'multer';
import path from 'path';

// Guardar la imagen en el buffer => luego subirla a Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, next) => {
    const allowedType = /png|jpeg|jpg|webp/;
    const ext = allowedType.test(path.extname(file.originalname));
    const mimetype = allowedType.test(file.mimetype);

    if (ext && mimetype) {
        next(null, true)
    } else {
        next(new Error("Invalid extension"))
    }
}

export default multer({
    storage,
    fileFilter,
    limits : {fieldSize : 5 * 1024 * 1024}
})