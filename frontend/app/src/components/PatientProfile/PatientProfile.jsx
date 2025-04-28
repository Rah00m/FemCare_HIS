import React, { useState } from 'react';
import './PatientProfile.css';
import babyLogo from './imgg.png';

const PatientProfile = ({ patientData }) => {
  const [activeSection, setActiveSection] = useState('basic-info');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderSection = () => {
    switch(activeSection) {
      case 'basic-info':
        return (
          <div className="content-section">
            <h2>Personal Information</h2>
            <InfoRow label="Full Name" value={patientData.basicInfo.full_name} />
            <InfoRow label="Date of Birth" value={`${patientData.dob} (Age: ${new Date().getFullYear() - new Date(patientData.dob).getFullYear()})`} />
            <InfoRow label="Blood Type" value={patientData.basicInfo.blood_type} />
            <InfoRow label="RH Factor" value={patientData.basicInfo.rh_factor} />
            <InfoRow label="Email" value={patientData.basicInfo.email} />
            <InfoRow label="Phone Number" value={patientData.basicInfo.phone_number} />
            <InfoRow label="Current Medications" value={patientData.basicInfo.current_medications.join(", ")} />
            <InfoRow label="Known Allergies" value={patientData.basicInfo.known_allergies.join(", ")} />
            
            <div className="family-info">
              <h3>Family Information</h3>
              <InfoRow label="Spouse" value={patientData.family.spouse} />
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
            <InfoRow label="Obstetric History" value={`G${patientData.obstetricHistory.gravida}P${patientData.obstetricHistory.para}A${patientData.obstetricHistory.abortions}`} />
            <InfoRow label="Living Children" value={patientData.obstetricHistory.living_children} />
            
            <div className="ultrasound-dates">
              <h3>Ultrasound Dates</h3>
              {patientData.pregnancyInfo.ultrasoundDates.map((date, i) => (
                <div key={i} className="date-badge">{date}</div>
              ))}
            </div>
            
            <div className="medical-category">
              <h3>Pregnancy Complications</h3>
              <div className="tags">
                {patientData.pregnancyInfo.complications.map((complication, i) => (
                  <span key={i} className="tag allergy">{complication}</span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <h2>Contact Information</h2>
            <InfoRow label="Primary Phone" value={patientData.contact.primaryMobile} />
            <InfoRow label="Secondary Phone" value={patientData.contact.secondaryMobile} />
            <InfoRow label="Landline" value={patientData.contact.landline} />
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
              <h3>Current Medications</h3>
              <div className="tags">
                {patientData.medicalHistory.medications.map((med, i) => (
                  <span key={i} className="tag medication">{med}</span>
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
            <div className="medical-category">
              <h3>Medical Conditions</h3>
              <div className="tags">
                {patientData.medicalHistory.conditions.map((condition, i) => (
                  <span key={i} className="tag condition">{condition}</span>
                ))}
              </div>
            </div>
            <div className="medical-category">
              <h3>Immunizations</h3>
              <div className="tags">
                {patientData.medicalHistory.immunizations.map((immunization, i) => (
                  <span key={i} className="tag immunization">{immunization}</span>
                ))}
              </div>
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
          <button className="nav-button">
            <i className="icon-calendar"></i> Home
          </button>
          <button className="nav-button">
            <i className="icon-settings"></i> Settings
          </button>
          <div className="user-profile">
            <div className="user-avatar">
              {patientData.name.split(' ').map(n => n[0]).join('')}
            </div>
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