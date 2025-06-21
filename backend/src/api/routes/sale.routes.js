import { Router } from "express";
import saleController from "../controllers/sale.controller.js";

const router = Router();

router.get('/', saleController.getAllSales);
router.get('/', saleController.getSaleById);

router.post('/', saleController.createSale)

export default router;