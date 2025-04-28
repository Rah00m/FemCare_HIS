import React from 'react';

const ProfileHeader = ({ patientData }) => (
  <div className="profile-header">
    <div className="profile-photo-container">
      {patientData.profilePhoto ? (
        <img src={patientData.profilePhoto} alt="Patient" className="profile-photo" />
      ) : (
        <div className="profile-photo-placeholder">
          {patientData.name.split(' ').map(n => n[0]).join('')}
        </div>
      )}
      <button className="edit-photo-btn">Edit</button>
    </div>
    <h1>{patientData.name}</h1>
    <p className="patient-id">ID: {patientData.id}</p>
    <div className="patient-status-tag">
      <span className={`status-indicator ${patientData.pregnancyInfo.currentWeek > 20 ? 'active' : ''}`}></span>
      {patientData.pregnancyInfo.currentWeek} weeks
    </div>
  </div>
);

export default ProfileHeader;
