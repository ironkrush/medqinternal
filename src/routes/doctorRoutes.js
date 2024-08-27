// doctorRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; 
import { roleCheck } from '../middleware/roleMiddleware.js';  
import { getAssignedPatients, submitPrescription } from '../controllers/doctorController.js'; 

const router = express.Router();

router.get('/patients', protect, roleCheck(['doctor']), getAssignedPatients);
router.post('/prescription', protect, roleCheck(['doctor']), submitPrescription);

export default router;
