import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AppointmentPage = () => {
    const { token } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        doctorId: '',
        appointmentType: 'normal',
        appointmentDate: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/api/patient/queue', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Failed to load appointments');
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDoctors(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Failed to load doctors');
            }
        };

        fetchAppointments();
        fetchDoctors();
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/patient/appointment', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Appointment booked successfully');
            setForm({
                doctorId: '',
                appointmentType: 'normal',
                appointmentDate: '',
            });
            const response = await axios.get('/api/patient/queue', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(response.data);
        } catch (err) {
            setError(err.response.data.message || 'Failed to book appointment');
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Doctor:</label>
                    <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                        <option value="">Select a Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.username} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Appointment Type:</label>
                    <select name="appointmentType" value={form.appointmentType} onChange={handleChange} required>
                        <option value="emergency">Emergency</option>
                        <option value="severe">Severe</option>
                        <option value="normal">Normal</option>
                    </select>
                </div>
                <div>
                    <label>Appointment Date:</label>
                    <input
                        type="datetime-local"
                        name="appointmentDate"
                        value={form.appointmentDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Book Appointment</button>
            </form>

            <h2>Your Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {new Date(appointment.appointmentDate).toLocaleString()} - {appointment.appointmentType} - {appointment.doctor.username} - {appointment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentPage;
