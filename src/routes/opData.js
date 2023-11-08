import express from 'express';

import AuthController from '../controllers/auth.js';
import OPDataController from '../controllers/opData.js';


const router = express.Router();

router.post('/op-data', AuthController.checkAPIToken, OPDataController.postOpData);
router.get('/op-data', AuthController.checkAPIToken, OPDataController.getOpData);

export default router; 