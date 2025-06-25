import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

function AdminDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/report')
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-5">
      <h3>Admin Report</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.employeeId}</td>
              <td>{r.name}</td>
              <td>{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : '-'}</td>
              <td>{r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : '-'}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
