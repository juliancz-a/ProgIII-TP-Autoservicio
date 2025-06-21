import { Router } from "express";
import saleController from "../controllers/sale.controller.js";

const router = Router();

router.get('/', saleController.getAll)

export default router;