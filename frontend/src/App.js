import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navigation/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MCQList from './components/Mcq/McqList';
import MCQForm from './components/Mcq/McqForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mcqs" element={<MCQList />} />
          <Route path="/mcqs/new" element={<MCQForm />} />
          <Route path="/mcqs/edit/:id" element={<MCQForm />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;