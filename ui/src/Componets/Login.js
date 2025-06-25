import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        employeeId,
        password
      });

      localStorage.setItem('token', res.data.token);
      if (employeeId.startsWith("admin")) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control value={employeeId} onChange={e => setEmployeeId(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
