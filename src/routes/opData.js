import express from 'express';

import AuthController from '../controllers/auth.js';
import OPDataController from '../controllers/opData.js';


const router = express.Router();

// router.post('/post-op-data', AuthController.checkAPIToken, OPDataController.postOpData);
router.post('/get-op-data', AuthController.checkAPIToken, OPDataController.getOpData);
router.get('/get-element-list', OPDataController.getElementList);
router.get('/post-json', OPDataController.addJSON);

export default router; 