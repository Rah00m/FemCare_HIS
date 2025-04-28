import React from 'react';
import DoctorCard from './DoctorCard';

const doctors = [
  { id: 1, name: "Dr. Emily Wilson", specialty: "Obstetrician", photo: "https://..." },
  { id: 2, name: "Dr. Michael Chen", specialty: "Gynecologist", photo: "https://..." },
  { id: 3, name: "Dr. Sarah William", specialty: "Maternal-Fetal Medicine", photo: "https://..." }
];

const DoctorsList = () => (
  <div className="doctors-container">
    <h2>Our Specialists</h2>
    <div className="doctors-grid">
      {doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} />)}
    </div>
  </div>
);

export default DoctorsList;
