import express from 'express';

import pageController from '../controllers/webpage.js';

const router = express.Router();

router.get('/', pageController.getHome);
router.post('/post-login', pageController.getPostLogIn);

export default router; 