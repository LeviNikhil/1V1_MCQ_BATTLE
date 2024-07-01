import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const Signup = (userData) => api.post('/users/register', userData);
export const Login = (userData) => api.post('/users/login', userData);
export const getMcqs = (token) => api.get('/mcqs', { headers: { 'x-auth-token': token } });
export const createMcq = (token, mcqData) => api.post('/mcqs', mcqData, { headers: { 'x-auth-token': token } });
export const updateMcq = (token, mcqId, mcqData) => api.put(`/mcqs/${mcqId}`, mcqData, { headers: { 'x-auth-token': token } });
export const deleteMcq = (token, mcqId) => api.delete(`/mcqs/${mcqId}`, { headers: { 'x-auth-token': token } });

export default api;