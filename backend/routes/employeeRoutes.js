// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create an employee
router.post('/', async (req, res) => {
  try {
    const { name, email, phoneNumber, designation } = req.body;
    const employee = new Employee({
      name,
      email,
      phoneNumber,
      designation,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, designation } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, designation },
      { new: true }
    );
    console.log(updatedEmployee);
    res.json(updatedEmployee);
    console.log(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
