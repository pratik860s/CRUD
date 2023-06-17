
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Display = ({ onDelete, onEdit }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.log('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>List of Employees</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.designation}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => onEdit(employee.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Display;
