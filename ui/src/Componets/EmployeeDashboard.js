import React from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

function EmployeeDashboard() {
  const token = localStorage.getItem('token');

  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const sendLocation = async (endpoint) => {
    if (!isMobile()) {
      alert("Check-In/Out is only allowed on mobile.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        await axios.post(`http://localhost:5000/api/check/${endpoint}`, {
          lat: latitude,
          lon: longitude
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(`${endpoint === 'in' ? 'Check-In' : 'Check-Out'} successful`);
      } catch (err) {
        alert(err.response.data.error || 'Error');
      }
    }, () => {
      alert("GPS is required for check-in/out");
    }, { enableHighAccuracy: true });
  };

  return (
    <Container className="mt-5">
      <h3>Employee Dashboard</h3>
      <Button variant="success" className="me-2" onClick={() => sendLocation('in')}>Check-In</Button>
      <Button variant="danger" onClick={() => sendLocation('out')}>Check-Out</Button>
    </Container>
  );
}

export default EmployeeDashboard;
