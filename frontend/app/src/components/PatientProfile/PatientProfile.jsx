import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientProfile.css';
import babyLogo from '../images/imgg.png';

const PatientProfile = () => {
  const [activeSection, setActiveSection] = useState('basic-info');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const patientData = {
    name: "Sarah Johnson",
    id: "P130412",
    dob: "15-May-1990",
    referredBy: "Dr. Smith",
    bloodGroup: "A+",
    family: {
      parent: "Mary Johnson",
      spouse: "Michael Johnson",
      children: ["Emma (2018)", "Liam (2020)"]
    },
    contact: {
      primaryMobile: "+1234567890",
      secondaryMobile: "+1987654321",
      landline: "+18005551234",
      email: "sarah.johnson@example.com",
      address: "123 Medical Center Dr, Suite 456",
      emergencyContact: "Michael Johnson (+1987654321)"
    },
    notes: [
      "Prenatal visit scheduled for next Wednesday",
      "Dr. Lee - 22 April 2023",
      "Requires ultrasound in next visit",
      "Gestational diabetes screening needed",
      "Expressed concerns about morning sickness",
      "Blood pressure slightly elevated at last visit",
      "Recommended increased water intake"
    ],
    medicalHistory: {
      allergies: ["Penicillin", "Latex"],
      surgeries: ["C-section (2018)", "Appendectomy (2005)"],
      conditions: ["Gestational hypertension", "Anemia"],
      medications: ["Prenatal vitamins", "Iron supplements"],
      immunizations: ["Flu vaccine (2022)", "TDAP (2022)"]
    },
    pregnancyInfo: {
      lmp: "01-Jan-2023",
      edd: "08-Oct-2023",
      gravida: 2,
      para: 1,
      abortions: 0,
      currentWeek: 32,
      ultrasoundDates: ["12-Feb-2023", "15-May-2023"],
      complications: ["Mild anemia", "Borderline glucose levels"]
    },
    profilePhoto: null
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'basic-info':
        return (
          <div className="content-section">
            <h2>Personal Information</h2>
            <InfoRow label="Patient Name" value={patientData.name} />
            <InfoRow 
            label="Date of Birth" 
            value={`${patientData.dob} (Age: ${new Date().getFullYear() - new Date(patientData.dob).getFullYear()})`} 
          />
            <InfoRow label="Blood Group" value={patientData.bloodGroup} />
            <div className="family-info">
              <h3>Family Information</h3>
              <InfoRow label="Current Week" value={`${patientData.pregnancyInfo.currentWeek} weeks`} />
              <InfoRow label="Children" value={patientData.family.children.join(", ")} />
            </div>
          </div>
        );
      case 'pregnancy':
        return (
          <div className="content-section">
            <h2>Pregnancy Information</h2>
            <div className="pregnancy-timeline">
              <div className="timeline-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(patientData.pregnancyInfo.currentWeek / 40) * 100}%` }}
                  ></div>
              </div>
              <div className="timeline-labels">
                <span>LMP: {patientData.pregnancyInfo.lmp}</span>
                <span>EDD: {patientData.pregnancyInfo.edd}</span>
              </div>
            </div>
            <InfoRow label="Current Week" value={`${patientData.pregnancyInfo.currentWeek} weeks`} />
            <InfoRow 
  label="Obstetric History" 
  value={`G${patientData.pregnancyInfo.gravida}P${patientData.pregnancyInfo.para}A${patientData.pregnancyInfo.abortions}`} 
/>            <div className="ultrasound-dates">
              <h3>Ultrasound Dates</h3>
              {patientData.pregnancyInfo.ultrasoundDates.map((date, i) => (
                <div key={i} className="date-badge">{date}</div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <h2>Contact Information</h2>
            <InfoRow label="Primary Phone" value={patientData.contact.primaryMobile} />
            <InfoRow label="Secondary Phone" value={patientData.contact.secondaryMobile} />
            <InfoRow label="Email" value={patientData.contact.email} />
            <InfoRow label="Address" value={patientData.contact.address} />
            <InfoRow 
              label="Emergency Contact" 
              value={patientData.contact.emergencyContact} 
              isEmergency={true}
            />
          </div>
        );
      case 'medical':
        return (
          <div className="content-section">
            <h2>Medical History</h2>
            <div className="medical-category">
              <h3>Allergies</h3>
              <div className="tags">
                {patientData.medicalHistory.allergies.map((allergy, i) => (
                  <span key={i} className="tag allergy">{allergy}</span>
                ))}
              </div>
            </div>
            <div className="medical-category">
              <h3>Previous Surgeries</h3>
              <ul className="medical-list">
                {patientData.medicalHistory.surgeries.map((surgery, i) => (
                  <li key={i}>{surgery}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="content-section">
            <h2>Clinical Notes</h2>
            <div className="notes-container">
              {patientData.notes.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-text">{note}</div>
                  <div className="note-meta">Dr. Smith • {new Date().toLocaleDateString()}</div>
                  {index < patientData.notes.length - 1 && <hr className="note-divider" />}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <img 
              src={babyLogo} 
              alt="Baby Logo" 
              className="logo-image"
            />
            <span className="logo-text">Obstetrics and Gynecology</span>
          </div>
          <div className="nav-links">
            <a href="#office" className="nav-link">Locations</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#specialties" className="nav-link">Find an obstetrician</a>
            <a href="#pricing" className="nav-link">Appointments</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#contact" className="nav-link">Contact Us</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-button" onClick={() => navigate('/')}>
            <i className="icon-calendar"></i> Home
          </button>
          <button className="nav-button">
            <i className="icon-settings"></i> Settings
          </button>
          <div className="user-profile">
            <div className="user-avatar">SJ</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`patient-profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◄' : '►'}
        </div>
        
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-photo-container">
              {patientData.profilePhoto ? (
                <img src={patientData.profilePhoto} alt="Patient" className="profile-photo" />
              ) : (
                <div className="profile-photo-placeholder">SJ</div>
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

          <nav className="sidebar-nav">
            <ul>
              <li 
                className={activeSection === 'basic-info' ? 'active' : ''}
                onClick={() => setActiveSection('basic-info')}
              >
                Personal Information
              </li>
              <li 
                className={activeSection === 'pregnancy' ? 'active' : ''}
                onClick={() => setActiveSection('pregnancy')}
              >
                Pregnancy Info
              </li>
              <li 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => setActiveSection('contact')}
              >
                Contact Details
              </li>
              <li 
                className={activeSection === 'medical' ? 'active' : ''}
                onClick={() => setActiveSection('medical')}
              >
                Medical History
              </li>
              <li 
                className={activeSection === 'notes' ? 'active' : ''}
                onClick={() => setActiveSection('notes')}
              >
                Clinical Notes
              </li>
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

const InfoRow = ({ label, value, isEmergency = false }) => (
<div className={`info-row ${isEmergency ? 'emergency' : ''}`}>
<span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);

export default PatientProfile;