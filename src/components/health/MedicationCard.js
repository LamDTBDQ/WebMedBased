import React from 'react';

const MedicationCard = ({ medication, onAddToCart }) => {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{medication.name}</h5>
                <p className="card-text">{medication.description}</p>
                <p className="card-text">
                    <small className="text-muted">Dosage: {medication.dosage}</small>
                </p>
                <p className="card-text">
                    <strong className="text-primary">Price: ${medication.price}</strong>
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => onAddToCart(medication)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default MedicationCard;