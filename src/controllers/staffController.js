// staffController.js
import Bed from '../models/Bed.js';
import Inventory from '../models/Inventory.js';

export const manageBedAvailability = async (req, res) => {
    const { bedNumber, isAvailable, assignedPatientId } = req.body;

    try {
        const bed = await Bed.findOne({ bedNumber });

        if (!bed) {
            return res.status(404).json({ message: 'Bed not found' });
        }

        bed.isAvailable = isAvailable;

        if (assignedPatientId) {
            bed.assignedPatient = assignedPatientId;
        } else {
            bed.assignedPatient = null;
        }

        await bed.save();

        res.json(bed);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const manageInventory = async (req, res) => {
    const { itemName, quantity, threshold } = req.body;

    try {
        const inventory = await Inventory.findOne({ itemName });

        if (inventory) {
            inventory.quantity = quantity;
            inventory.threshold = threshold;
            inventory.lastUpdated = Date.now();
            await inventory.save();
        } else {
            await Inventory.create({ itemName, quantity, threshold });
        }

        res.json({ message: 'Inventory updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getLowStockItems = async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({ quantity: { $lt: threshold } });

        if (!lowStockItems.length) {
            return res.status(200).json({ message: 'No low stock items' });
        }

        res.json(lowStockItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
