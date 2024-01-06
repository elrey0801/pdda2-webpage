import express from 'express';

import AuthController from '../controllers/auth.js';
import WorkingElementController from '../controllers/workingElement.js'


const router = express.Router();

router.post('/create-working-element', WorkingElementController.createWorkingElement);
router.get('/get-working-elements', WorkingElementController.getWorkingElements);

export default router; 