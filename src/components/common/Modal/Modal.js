// src/Modal.js
import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const initialFormState = {
    ngoName: '',
    location: '',
    memberName: '',
    mobileNumber: '',
    distributionArea: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form.');
      }

      console.log('User data added successfully');
      setFormData(initialFormState); // Reset form
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Order Details</h2>
          <form onSubmit={handleSubmit}>
            <label>
              NGO Name:
              <input
                type="text"
                value={formData.ngoName}
                name="ngoName"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={formData.location}
                name="location"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Member Name:
              <input
                type="text"
                value={formData.memberName}
                name="memberName"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Mobile Number:
              <input
                type="tel"
                value={formData.mobileNumber}
                name="mobileNumber"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Distribution Area:
              <input
                type="text"
                value={formData.distributionArea}
                name="distributionArea"
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
