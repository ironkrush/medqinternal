import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Role not authorized
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
