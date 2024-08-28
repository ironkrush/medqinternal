import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
