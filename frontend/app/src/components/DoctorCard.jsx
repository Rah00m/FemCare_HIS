import React from 'react';

const DoctorCard = ({ doctor }) => (
  <div className="doctor-card">
    <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
    <h3>{doctor.name}</h3>
    <p>{doctor.specialty}</p>
    <button>View Profile</button>
  </div>
);

export default DoctorCard;
