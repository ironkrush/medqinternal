import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ProfilePage from './pages/ProfilePage';
import AppointmentPage from './pages/AppointmentPage';
import BedManagementPage from './pages/BedManagementPage';
import InventoryPage from './pages/InventoryPage';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />


                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardRedirect />
                            </ProtectedRoute>
                        }
                    />


                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/appointments"
                        element={
                            <ProtectedRoute roles={['patient']}>
                                <AppointmentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/bed-management"
                        element={
                            <ProtectedRoute roles={['staff']}>
                                <BedManagementPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/inventory"
                        element={
                            <ProtectedRoute roles={['staff']}>
                                <InventoryPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

const DashboardRedirect = () => {
    const { user } = React.useContext(AuthContext);

    if (user.role === 'patient') {
        return <PatientDashboard />;
    } else if (user.role === 'doctor') {
        return <DoctorDashboard />;
    } else if (user.role === 'staff') {
        return <StaffDashboard />;
    } else {
        return <HomePage />;
    }
};

export default App;
