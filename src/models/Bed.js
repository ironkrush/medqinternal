// Bed.js
import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    bedNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    assignedPatient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }
}, { timestamps: true });

const Bed = mongoose.model('Bed', bedSchema);
export default Bed;
