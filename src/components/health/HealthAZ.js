import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import MedicationCard from './MedicationCard';

const HealthAZ = () => {
    const navigate = useNavigate();
    const [medications, setMedications] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchMedications = async () => {
            const data = await api.getMedications();
            setMedications(data);
        };
        fetchMedications();
    }, []);

    const addToCart = (medication) => {
        setCart([...cart, medication]);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Health A-Z & Medications</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        {medications.map((medication) => (
                            <div key={medication.medication_id} className="col-md-6 mb-4">
                                <MedicationCard
                                    medication={medication}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        ))}
                    </div>
                    {cart.length > 0 && (
                        <div className="mt-4 border-top pt-4">
                            <h3>Shopping Cart</h3>
                            <p>Total Items: {cart.length}</p>
                            <p>Total Price: ${cart.reduce((sum, med) => sum + med.price, 0).toFixed(2)}</p>
                            <button
                                className="btn btn-success"
                                onClick={() => navigate('/payment')}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthAZ;