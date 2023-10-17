import express from 'express';

import authController from '../controllers/auth.js';

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.delete('/logout', authController.logout);

export default router;