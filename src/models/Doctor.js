// Doctor.js
import mongoose from 'mongoose';
import User from './User.js';

const doctorSchema = new mongoose.Schema({
    specialization: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
    }
});

const Doctor = User.discriminator('Doctor', doctorSchema);
export default Doctor;
