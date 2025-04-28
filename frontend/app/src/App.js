<<<<<<< HEAD
import React, { useState } from 'react';
import './App.css';
import babyLogo from './imgg.png';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: ''
  });

  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Wilson",
      specialty: "Obstetrician",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Gynecologist",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Dr. Sarah William",
      specialty: "Maternal-Fetal Medicine",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in with ${formData.email}`);
    } else {
      alert(`Signing up as ${formData.name}\nPhone: ${formData.phone}\nDOB: ${formData.dob}`);
    }
    
    // Set patient data and log in
    const data = getPatientData(formData);
    setPatientData(data);
    setIsLoggedIn(true);
    setShowAuthForms(false);
  };

  const getPatientData = (formData) => {
    return {
      name: formData.name || "Sarah Johnson",
      id: "P130412",
      dob: formData.dob || "1990-05-15",
      referredBy: "Dr. Smith",
      family: {
        parent: "Mary Johnson",
        spouse: "Michael Johnson",
        children: ["Emma (2018)", "Liam (2020)"]
      },
      contact: {
        primaryMobile: formData.phone || "+1234567890",
        secondaryMobile: "+1987654321",
        landline: "+18005551234",
        email: formData.email,
        address: "123 Medical Center Dr, Suite 456, Boston, MA 02115",
        emergencyContact: "Michael Johnson (+1987654321)"
      },
      medicalHistory: {
        allergies: ["Penicillin", "Latex", "Shellfish"],
        surgeries: ["C-section (2018)", "Appendectomy (2005)"],
        conditions: ["Gestational hypertension", "Anemia"],
        medications: ["Prenatal vitamins", "Iron supplements", "Folic acid"],
        immunizations: ["Flu vaccine (2022)", "TDAP (2022)"]
      },
      pregnancyInfo: {
        lmp: "01-Jan-2023",
        edd: "08-Oct-2023",
        currentWeek: 32,
        ultrasoundDates: ["12-Feb-2023", "15-May-2023"],
        complications: ["Mild anemia", "Borderline glucose levels"]
      },
      obstetricHistory: {
        gravida: 2,
        para: 1,
        abortions: 0,
        living_children: 1
      },
      basicInfo: {
        rh_factor: "Positive",
        blood_type: "A+",
        current_medications: ["Prenatal vitamins", "Iron supplements", "Folic acid"],
        known_allergies: ["Penicillin", "Latex", "Shellfish"],
        full_name: formData.name || "Sarah Johnson",
        email: formData.email,
        phone_number: formData.phone || "+1234567890"
      },
      profilePhoto: null
    };
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPatientData(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      dob: ''
    });
  };

  if (isLoggedIn && patientData) {
    return <PatientProfile patientData={patientData} onLogout={handleLogout} />;
  }

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
            <span>Home</span>
          </button>
          <button 
            className="nav-button login-btn"
            onClick={() => setShowAuthForms(!showAuthForms)}
          >
            <span>Login</span>
          </button>
          <button className="nav-button">
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Department Title */}
      <div className="department-title">
        <h1>Department of Obstetrics and Gynecology</h1>
      </div>

      {/* Doctor Profiles Section */}
      <div className="doctors-container">
        <h2 className="doctors-title">Our Specialists</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-photo-container">
                <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <button className="view-profile-btn">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Forms (hidden by default) */}
      {showAuthForms && (
        <div className="auth-forms-overlay">
          <div className="auth-forms-container">
            <button 
              className="close-auth-btn"
              onClick={() => setShowAuthForms(false)}
            >
              ×
            </button>
            
            {/* Login/Register Tabs */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="pink-login-box">
              {isLogin ? (
                // LOGIN FORM
                <form onSubmit={handleSubmit} className="pink-form">
                  <h2>Welcome Back!</h2>
                  <p>To keep connected with us please login with your personal info</p>
                  
                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">f</button>
                    <button type="button" className="pink-social-btn">G+</button>
                    <button type="button" className="pink-social-btn">in</button>
                  </div>

                  <div className="pink-divider">or use your email</div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  <button type="submit" className="pink-submit-btn">SIGN IN</button>
                </form>
              ) : (
                // SIGNUP FORM
                <form onSubmit={handleSubmit} className="pink-form">
                  <h2>Create Account</h2>
                  
                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">f</button>
                    <button type="button" className="pink-social-btn">G+</button>
                    <button type="button" className="pink-social-btn">in</button>
                  </div>

                  <div className="pink-divider">or use your email for registration</div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  <button type="submit" className="pink-submit-btn">SIGN UP</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
=======
// import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginSignup from './components/LoginSignup';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginSignup />
      </header>
>>>>>>> 749f074ed2fba0b3d0a124c32cbb0a1173087d03
    </div>
  );
};

<<<<<<< HEAD
const PatientProfile = ({ patientData, onLogout }) => {
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
            <span>Home</span>
          </button>
          <button className="nav-button" onClick={onLogout}>
            <span>Logout</span>
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

export default App;
=======

export default App;
>>>>>>> 749f074ed2fba0b3d0a124c32cbb0a1173087d03
