import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

export const getPatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const bookAppointment = async (req, res) => {
    const { doctorId, appointmentType, appointmentDate } = req.body;
    try {
        const appointment = await Appointment.create({
            patient: req.user._id,
            doctor: doctorId,
            appointmentType,
            appointmentDate,
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAppointmentQueue = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'username specialization');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
