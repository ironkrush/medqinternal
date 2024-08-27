import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const BedManagementPage = () => {
    const { token } = useContext(AuthContext);
    const [beds, setBeds] = useState([]);
    const [form, setForm] = useState({
        bedNumber: '',
        isAvailable: true,
        assignedPatientId: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchBeds = async () => {
            try {
                const response = await axios.get('/api/staff/beds', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBeds(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Failed to load beds');
            }
        };

        fetchBeds();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/staff/beds', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Bed updated successfully');
            setForm({
                bedNumber: '',
                isAvailable: true,
                assignedPatientId: '',
            });
            // Refresh beds
            const response = await axios.get('/api/staff/beds', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBeds(response.data);
        } catch (err) {
            setError(err.response.data.message || 'Failed to update bed');
        }
    };

    return (
        <div>
            <h2>Bed Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bed Number:</label>
                    <input
                        type="number"
                        name="bedNumber"
                        value={form.bedNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Is Available:</label>
                    <input
                        type="checkbox"
                        name="isAvailable"
                        checked={form.isAvailable}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Assigned Patient ID:</label>
                    <input
                        type="text"
                        name="assignedPatientId"
                        value={form.assignedPatientId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Bed</button>
            </form>

            <h2>All Beds</h2>
            <ul>
                {beds.map((bed) => (
                    <li key={bed._id}>
                        Bed #{bed.bedNumber} - {bed.isAvailable ? 'Available' : `Occupied by ${bed.assignedPatient || 'N/A'}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BedManagementPage;
