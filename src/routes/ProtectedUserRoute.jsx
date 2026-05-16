import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../controllers/AuthProvider';

const ProtectedUserRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to signin while saving the attempted location
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedUserRoute;
