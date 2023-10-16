import express from 'express';

import pageController from '../controllers/webpage.js';

const router = express.Router();

router.get('/', pageController.getHome);

export default router;