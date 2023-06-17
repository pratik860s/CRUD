
import React, { useState } from 'react';
import axios from 'axios';

const Edit = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState(employee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/employees/${employee.id}`, formData);

      onSave(formData);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Edit Employee</h2>
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
         </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;

