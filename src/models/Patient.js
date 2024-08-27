// Patient.js
import mongoose from 'mongoose';
import User from './User.js';

const patientSchema = new mongoose.Schema({
    medicalHistory: {
        type: String,
    },
    familyHistory: {
        type: String,
    },
    currentMedications: {
        type: String,
    }
});

const Patient = User.discriminator('Patient', patientSchema);
export default Patient;
