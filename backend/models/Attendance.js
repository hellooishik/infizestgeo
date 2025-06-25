const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  date: String,
  checkIn: Date,
  checkOut: Date,
  status: String,
  location: {
    type: [Number],
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
