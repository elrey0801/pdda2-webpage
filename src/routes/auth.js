import express from 'express';
import AuthController from '../controllers/auth.js';


const router = express.Router();

router.get('/login', AuthController.checkNotAuthenticated, AuthController.getLogin);

router.post('/login', AuthController.checkNotAuthenticated, AuthController.postLogin);

router.post('/logout', AuthController.checkAuthenticated, AuthController.logout);

export default router;