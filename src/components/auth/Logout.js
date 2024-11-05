import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // Clear any cart data
        localStorage.removeItem('cart');

        // Perform logout
        logout();

        // Redirect to login page
        navigate('/login');
    }, [logout, navigate]);

    // Show loading message while logout is processing
    return (
        <div className="container mt-5">
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Logging out...</p>
            </div>
        </div>
    );
};

export default Logout;