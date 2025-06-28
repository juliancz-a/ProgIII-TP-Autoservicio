import { Router } from "express";
import imageController from "../controllers/image.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/', imageController.getAllImages);

router.get('/:id', imageController.getImageById);

router.post('/', upload.single('image'), imageController.uploadImage);

export default router;