import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const Payment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        address: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create order first
            const order = await api.createOrder({
                items: JSON.parse(localStorage.getItem('cart') || '[]'),
                total: calculateTotal(),
                date: new Date().toISOString(),
            });

            // Process payment
            const paymentResponse = await api.processPayment({
                orderId: order.order_id,
                ...formData,
            });

            if (paymentResponse.success) {
                // Clear cart and redirect to success page
                localStorage.removeItem('cart');
                navigate('/health', { state: { paymentSuccess: true } });
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during payment processing.');
            console.error('Payment error:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        return cart.reduce((sum, item) => sum + item.price, 0);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2>Payment Information</h2>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Expiry Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.expiryDate}
                                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.cvv}
                                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cardholder Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Billing Address</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <h4>Order Summary</h4>
                                    <p className="text-end">
                                        <strong>Total Amount: ${calculateTotal().toFixed(2)}</strong>
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Complete Payment'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;