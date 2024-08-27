import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const InventoryPage = () => {
    const { token } = useContext(AuthContext);
    const [inventory, setInventory] = useState([]);
    const [form, setForm] = useState({
        itemName: '',
        quantity: '',
        threshold: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/api/staff/inventory', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInventory(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Failed to load inventory');
            }
        };

        fetchInventory();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/staff/inventory', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Inventory updated successfully');
            setForm({
                itemName: '',
                quantity: '',
                threshold: '',
            });
            // Refresh inventory
            const response = await axios.get('/api/staff/inventory', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInventory(response.data);
        } catch (err) {
            setError(err.response.data.message || 'Failed to update inventory');
        }
    };

    return (
        <div>
            <h2>Inventory Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        name="itemName"
                        value={form.itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Threshold:</label>
                    <input
                        type="number"
                        name="threshold"
                        value={form.threshold}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Inventory</button>
            </form>

            <h2>Current Inventory</h2>
            <ul>
                {inventory.map((item) => (
                    <li key={item._id}>
                        {item.itemName} - Quantity: {item.quantity} - Threshold: {item.threshold}
                        {item.quantity < item.threshold && <span style={{ color: 'red' }}> (Low Stock)</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryPage;
