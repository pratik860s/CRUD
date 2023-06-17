import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      phoneNumber: '',
      designation: ''
    };

    if (formData.name.trim() === '') {
      errors.name = 'Name is required';
      valid = false;
    }

    if (formData.email.trim() === '') {
      errors.email = 'Email is required';
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (formData.phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone Number is required';
      valid = false;
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
      valid = false;
    }

    if (formData.designation.trim() === '') {
      errors.designation = 'Designation is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/employees', formData);
        console.log('Employee added:', response.data);

        // Clear the form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          designation: ''
        });
        setFormErrors({
          name: '',
          email: '',
          phoneNumber: '',
          designation: ''
        });

        // Call the callback function to notify parent component
        onAddEmployee();
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {formErrors.phoneNumber && <div className="text-danger">{formErrors.phoneNumber}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
          />
          {formErrors.designation && <div className="text-danger">{formErrors.designation}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Create;
