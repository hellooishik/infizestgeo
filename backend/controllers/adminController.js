const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

exports.getReport = async (req, res) => {
  try {
    const records = await Attendance.find({});
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  const { employeeId, name, password } = req.body;
  try {
    const emp = new Employee({ employeeId, name, password });
    await emp.save();
    res.json({ message: 'Employee created' });
  } catch (err) {
    res.status(400).json({ error: 'Error creating employee' });
  }
};
