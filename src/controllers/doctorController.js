import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

export const getAssignedPatients = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user._id, status: 'pending' }).populate('patient', 'username medicalHistory');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const submitPrescription = async (req, res) => {
    const { appointmentId, prescription } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment || appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.prescription = prescription;
        appointment.status = 'completed';

        await appointment.save();

        res.json({ message: 'Prescription submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
