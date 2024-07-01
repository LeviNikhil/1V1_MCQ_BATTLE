import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Check if formData is correctly populated
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      console.log('Login response:', response.data); // Check response data
      setAuthToken(response.data.token); // Set the auth token
      navigate('/mcqs');  // Redirect to the MCQ list
    } catch (error) {
      console.error('Login failed!', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;