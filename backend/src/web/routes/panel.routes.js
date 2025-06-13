import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

export default router;