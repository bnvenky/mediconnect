/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PatientDashboard from './components/Patient/PatientDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const isLoggedIn = !!localStorage.getItem('currentUser');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
        <Route path="/doctor/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;








