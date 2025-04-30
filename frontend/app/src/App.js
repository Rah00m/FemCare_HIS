import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import PatientProfile from './components/PatientProfile/PatientProfile';
import DoctorProfile from './components/DoctorProfile/DoctorProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient-profile" element={<PatientProfile />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/doctor/:id" element={<DoctorProfile />} />
    </Routes>
  );
}

export default App;
