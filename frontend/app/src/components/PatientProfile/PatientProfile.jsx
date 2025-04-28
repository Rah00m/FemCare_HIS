import React, { useState } from 'react';
import PersonalInfo from './sections/PersonalInfo';
import PregnancyInfo from './sections/PregnancyInfo';
import ContactInfo from './sections/contactInfo';
import MedicalHistory from './sections/MedicalHistory';
import babyLogo from '../images/imgg.png';
import './PatientProfile.css'; // Assuming you have a CSS file for styles
const PatientProfile = ({ patientData, onLogout }) => {
  const [activeSection, setActiveSection] = useState('basic-info');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderSection = () => {
    switch (activeSection) {
      case 'basic-info':
        return <PersonalInfo basicInfo={patientData.basicInfo} dob={patientData.dob} />;
      case 'pregnancy':
        return <PregnancyInfo pregnancyInfo={patientData.pregnancyInfo} obstetricHistory={patientData.obstetricHistory} />;
       case 'contact':
         return <ContactInfo contact={patientData.contact} />;
      case 'medical':
        return <MedicalHistory medicalHistory={patientData.medicalHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <img src={babyLogo} alt="Baby Logo" className="logo-image" />
            <span className="logo-text">Obstetrics and Gynecology</span>
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-button">Home</button>
          <button className="nav-button" onClick={onLogout}>Logout</button>
          <div className="user-profile">
            <div className="user-avatar">
              {patientData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </nav>

      <div className={`patient-profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◄' : '►'}
        </div>

        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-photo-container">
              <div className="profile-photo-placeholder">
                {patientData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="edit-photo-btn">Edit</button>
            </div>
            <h1>{patientData.name}</h1>
            <p className="patient-id">ID: {patientData.id}</p>
            <div className="patient-status-tag">
              <span className={`status-indicator ${patientData.pregnancyInfo.currentWeek > 20 ? 'active' : ''}`}></span>
              {patientData.pregnancyInfo.currentWeek} weeks
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={activeSection === 'basic-info' ? 'active' : ''} onClick={() => setActiveSection('basic-info')}>Personal Info</li>
              <li className={activeSection === 'pregnancy' ? 'active' : ''} onClick={() => setActiveSection('pregnancy')}>Pregnancy Info</li>
              <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => setActiveSection('contact')}>Contact Details</li>
              <li className={activeSection === 'medical' ? 'active' : ''} onClick={() => setActiveSection('medical')}>Medical History</li>
            </ul>
          </nav>
        </aside>

        <main className="profile-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;