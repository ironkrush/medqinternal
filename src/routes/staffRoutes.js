import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { roleCheck } from '../middleware/roleMiddleware.js';  
import { manageBedAvailability, manageInventory, getLowStockItems } from '../controllers/staffController.js';  

const router = express.Router();

router.post('/beds', protect, roleCheck(['staff']), manageBedAvailability);
router.post('/inventory', protect, roleCheck(['staff']), manageInventory);
router.get('/inventory/low-stock', protect, roleCheck(['staff']), getLowStockItems);

export default router;
