
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './Display';
import Create from './Create';
import Edit from './Edit';

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      await axios.post('http://localhost:8000/employees', employee);
      fetchEmployees();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const editEmployeeDetails = async (updatedEmployee) => {
    try {
      await axios.put(`http://localhost:8000/employees/${updatedEmployee.id}`, updatedEmployee);
      fetchEmployees();
      setEditEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEdit = (employeeId) => {
    const employee = employees.find((employee) => employee.id === employeeId);
    console.log(employeeId);
    console.log(employee);
    if (employee) {
      setEditEmployee(employee);
    }
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      {editEmployee ? (
        <Edit employee={editEmployee} onSave={editEmployeeDetails} onCancel={() => setEditEmployee(null)} />
      ) : (
        <div>
          <Display employees={employees} onEdit={handleEdit} onDelete={deleteEmployee} />
          {showForm ? (
            <Create addEmployee={addEmployee} onCancel={toggleForm} />
          ) : (
            <button className="btn btn-primary" onClick={toggleForm}>
              Add New Employee
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

