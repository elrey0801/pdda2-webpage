import express from 'express';

import WebPageController from '../controllers/webpage.js';
import AuthController from '../controllers/auth.js';

const router = express.Router();

router.get('/', AuthController.checkAuthenticated, WebPageController.getHome);

export default router; 