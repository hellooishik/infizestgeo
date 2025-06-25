const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { employeeId, name, password } = req.body;
  try {
    const emp = new Employee({ employeeId, name, password });
    await emp.save();
    res.json({ message: 'Employee registered' });
  } catch (err) {
    res.status(400).json({ error: 'Employee ID already exists' });
  }
};

exports.login = async (req, res) => {
  const { employeeId, password } = req.body;
  const emp = await Employee.findOne({ employeeId });
  if (!emp || !(await emp.comparePassword(password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ employeeId: emp.employeeId, name: emp.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
