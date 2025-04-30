import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientProfile.css";
import babyLogo from "../images/imgg.png";
import { getuserDetails } from "../auth/loginAuth";

const PatientProfile = () => {
  const [activeSection, setActiveSection] = useState("basic-info");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getuserDetails();
        console.log("Patient data:", data);
        setPatientData(data); // خزن كل الـ object عشان تقرأ من user و pregnancyInfo و contact
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, []);
  if (!patientData || !patientData.user) {
    return <div>Loading patient data...</div>;
  }
  const { user, contact, pregnancyInfo, bloodGroup } = patientData;

  const renderSection = () => {
    // if (!patientData.pregnancyInfo) {
    //   return <div>Missing pregnancy information</div>;
    // }

    switch (activeSection) {
      case "basic-info":
        return (
          <div className="content-section">
            <h2>Personal Information</h2>
            <InfoRow label="Patient Name" value={user.name} />
            <InfoRow label="Date of Birth" value={`${user.dob.slice(0, 10)}`} />
            <InfoRow label="age" value={`${patientData.age ?? "N/A"} years`} />
            <InfoRow label="Email" value={user?.email || contact?.email} />
            <InfoRow
              label="Phone"
              value={user?.phone || contact?.primaryMobile}
            />
            <InfoRow label="Blood Group" value={bloodGroup?.bloodGroup} />
            <div className="family-info">
              <h3>Family Information</h3>
              <InfoRow
                label="Current Week"
                value={`${pregnancyInfo?.currentWeek} weeks`}
              />
              {/* <InfoRow label="Children" value={patientData.family.children.join(", ")} /> */}
              value={patientData.family?.children?.join(", ") ?? "N/A"}
            </div>
          </div>
        );
      case "pregnancy":
        return (
          <div className="content-section">
            <h2>Pregnancy Information</h2>
            <div className="pregnancy-timeline">
              <div className="timeline-bar">
                <div
                  className="progress"
                  // style={{ width: `${(patientData.pregnancyInfo.currentWeek / 40) * 100}%` }}
                  style={{
                    width: `${((pregnancyInfo.currentWeek ?? 0) / 40) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="timeline-labels">
                <span>LMP: {pregnancyInfo.lmp}</span>
                <span>EDD: {pregnancyInfo.edd}</span>
              </div>
            </div>
            {/* <InfoRow label="Current Week" value={`${patientData.pregnancyInfo.currentWeek} weeks`} /> */}
            {/* value={`${patientData.pregnancyInfo?.currentWeek ?? 'N/A'} weeks`} */}
            value={`${patientData.pregnancyInfo?.currentWeek ?? "N/A"} weeks`}
            <InfoRow
              label="Obstetric History"
              value={`G${patientData.pregnancyInfo.gravida}P${patientData.pregnancyInfo.para}A${patientData.pregnancyInfo.abortions}`}
            />{" "}
            <div className="ultrasound-dates">
              <h3>Ultrasound Dates</h3>
              {/* {patientData.pregnancyInfo.ultrasoundDates.map((date, i) => ( */}
              {patientData.pregnancyInfo?.ultrasoundDates?.map((date, i) => (
                <div key={i} className="date-badge">
                  {date}
                </div>
              ))}
            </div>
          </div>
        );
      case "medical":
        return (
          <div className="content-section">
            <h2>Medical History</h2>
            <div className="medical-category">
              <h3>Allergies</h3>
              <div className="tags">
                {patientData.medicalHistory?.allergies.map((allergy, i) => (
                  <span key={i} className="tag allergy">
                    {allergy}
                  </span>
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
      case "notes":
        return (
          <div className="content-section">
            <h2>Clinical Notes</h2>
            <div className="notes-container">
              {patientData.notes?.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-text">{note}</div>
                  <div className="note-meta">
                    Dr. Smith • {new Date().toLocaleDateString()}
                  </div>
                  {index < patientData.notes.length - 1 && (
                    <hr className="note-divider" />
                  )}
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
            <img src={babyLogo} alt="Baby Logo" className="logo-image" />
            <span className="logo-text">Obstetrics and Gynecology</span>
          </div>
          <div className="nav-links">
            <a href="#office" className="nav-link">
              Locations
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#specialties" className="nav-link">
              Find an obstetrician
            </a>
            <a href="#pricing" className="nav-link">
              Appointments
            </a>
            <a href="#about" className="nav-link">
              About Us
            </a>
            <a href="#contact" className="nav-link">
              Contact Us
            </a>
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-button" onClick={() => navigate("/")}>
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
      <div
        className={`patient-profile-container ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "◄" : "►"}
        </div>

        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-photo-container">
              {patientData.profilePhoto ? (
                <img
                  src={patientData.profilePhoto}
                  alt="Patient"
                  className="profile-photo"
                />
              ) : (
                <div className="profile-photo-placeholder">SJ</div>
              )}
              <button className="edit-photo-btn">Edit</button>
            </div>
            <h1>{patientData.name}</h1>
            <p className="patient-id">ID: {patientData.id}</p>
            <div className="patient-status-tag">
              {/* <span className={`status-indicator ${patientData.pregnancyInfo.currentWeek > 20 ? 'active' : ''}`}></span>
            {patientData.pregnancyInfo.currentWeek} weeks */}
              <span
                className={`status-indicator ${
                  patientData.pregnancyInfo?.currentWeek > 20 ? "active" : ""
                }`}
              ></span>
              {patientData.pregnancyInfo?.currentWeek ?? "N/A"} weeks
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li
                className={activeSection === "basic-info" ? "active" : ""}
                onClick={() => setActiveSection("basic-info")}
              >
                Personal Information
              </li>
              <li
                className={activeSection === "pregnancy" ? "active" : ""}
                onClick={() => setActiveSection("pregnancy")}
              >
                Pregnancy Info
              </li>
              <li
                className={activeSection === "contact" ? "active" : ""}
                onClick={() => setActiveSection("contact")}
              >
                Contact Details
              </li>
              <li
                className={activeSection === "medical" ? "active" : ""}
                onClick={() => setActiveSection("medical")}
              >
                Medical History
              </li>
              <li
                className={activeSection === "notes" ? "active" : ""}
                onClick={() => setActiveSection("notes")}
              >
                Clinical Notes
              </li>
            </ul>
          </nav>
        </aside>

        <main className="profile-content">{renderSection()}</main>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, isEmergency = false }) => (
  <div className={`info-row ${isEmergency ? "emergency" : ""}`}>
    <span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);

export default PatientProfile;
