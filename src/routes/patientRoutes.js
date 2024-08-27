import express from 'express';
import { protect } from '../middleware/authMiddleware.js';  
import { getPatientProfile, bookAppointment, getAppointmentQueue } from '../controllers/patientController.js';  

const router = express.Router();

router.get('/profile', protect, getPatientProfile);
router.post('/appointment', protect, bookAppointment);
router.get('/queue', protect, getAppointmentQueue);

export default router;
