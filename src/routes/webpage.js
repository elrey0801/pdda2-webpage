import express from 'express';

import WebPageController from '../controllers/webpage.js';
import AuthController from '../controllers/auth.js';

const router = express.Router();

router.get('/', AuthController.checkAuthenticated, WebPageController.getHome);
router.get('/data', AuthController.checkAuthenticated, WebPageController.getDataPage);
router.get('/create-working-group', AuthController.checkAuthenticated, WebPageController.getCreateWorkingGroupPage);

export default router; 