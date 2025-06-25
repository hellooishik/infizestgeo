const Attendance = require('../models/Attendance');
const haversine = require('../utils/haversine');
const moment = require('moment');

const OFFICE_LAT = parseFloat(process.env.OFFICE_LAT);
const OFFICE_LON = parseFloat(process.env.OFFICE_LON);
const MAX_DIST = parseFloat(process.env.MAX_DISTANCE);
const STRICT_TIME = process.env.STRICT_TIME;

exports.checkIn = async (req, res) => {
  const { lat, lon } = req.body;
  const { employeeId, name } = req.user;

  const distance = haversine(OFFICE_LAT, OFFICE_LON, lat, lon);
  if (distance > MAX_DIST) {
    return res.status(403).json({ error: 'Not within office check-in zone' });
  }

  const today = moment().format('YYYY-MM-DD');
  const now = moment();

  const status = now.isAfter(moment(today + ' ' + STRICT_TIME)) ? 'Late' : 'In-Time';

  let attendance = await Attendance.findOne({ employeeId, date: today });
  if (attendance) return res.status(400).json({ error: 'Already checked in today' });

  attendance = new Attendance({
    employeeId,
    name,
    date: today,
    checkIn: now.toDate(),
    location: [lat, lon],
    status
  });

  await attendance.save();
  res.json({ message: 'Checked in successfully', status });
};

exports.checkOut = async (req, res) => {
  const { employeeId } = req.user;
  const today = moment().format('YYYY-MM-DD');
  const attendance = await Attendance.findOne({ employeeId, date: today });
  if (!attendance) return res.status(404).json({ error: 'No check-in found today' });

  attendance.checkOut = new Date();
  await attendance.save();
  res.json({ message: 'Checked out successfully' });
};
