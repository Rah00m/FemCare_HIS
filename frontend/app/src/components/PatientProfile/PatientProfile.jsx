import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientProfile.css";
import babyLogo from "../images/imgg.png";
import { getuserDetails } from "../auth/loginAuth";

const PatientProfile = () => {
  const [activeSection, setActiveSection] = useState("basic-info");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    dob: "",
    nationalId: "",
    patientId: ""
  });
  const [editMedicalFormData, setEditMedicalFormData] = useState({
    allergies: "",
    surgeries: "",
    chronicConditions: "",
    medications: ""
  });
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getuserDetails();
        console.log("Patient data:", data);
        setPatientData(data);
        
        // Initialize edit forms with current data
        setEditFormData({
          name: data.user?.name || "",
          dob: data.user?.dob?.slice(0, 10) || "",
          nationalId: data.user?.nationalId || "",
          patientId: data.user?.patientId || ""
        });
        
        setEditMedicalFormData({
          allergies: data.medicalHistory?.allergies?.join(", ") || "",
          surgeries: data.medicalHistory?.surgeries?.join(", ") || "",
          chronicConditions: data.medicalHistory?.chronicConditions?.join(", ") || "",
          medications: data.medicalHistory?.medications?.join(", ") || ""
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleMedicalEditChange = (e) => {
    const { name, value } = e.target;
    setEditMedicalFormData({
      ...editMedicalFormData,
      [name]: value,
    });
  };

  const handleSavePersonalInfo = async () => {
    try {
      // Add your save logic here
      console.log("Saving personal info:", editFormData);
      // After successful save:
      setIsEditing(false);
      // Refresh data
      const data = await getuserDetails();
      setPatientData(data);
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };

  const handleSaveMedicalHistory = async () => {
    try {
      // Add your save logic here
      console.log("Saving medical history:", editMedicalFormData);
      // After successful save:
      setIsEditingMedical(false);
      // Refresh data
      const data = await getuserDetails();
      setPatientData(data);
    } catch (error) {
      console.error("Error saving medical history:", error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      // Add your note saving logic here
      console.log("Adding note:", newNote);
      // After successful save:
      setNewNote("");
      // Refresh data
      const data = await getuserDetails();
      setPatientData(data);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (!patientData || !patientData.user) {
    return <div>Loading patient data...</div>;
  }

  const { user, contact, pregnancyInfo, bloodGroup, medicalHistory, notes } = patientData;

  const renderSection = () => {
    switch (activeSection) {
      case "basic-info":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit Information
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>National ID</label>
                  <input
                    type="text"
                    name="nationalId"
                    value={editFormData.nationalId}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={editFormData.patientId}
                    onChange={handleEditChange}
                    disabled // Typically patient ID shouldn't be editable
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={editFormData.dob}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-actions">
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="save-button" onClick={handleSavePersonalInfo}>
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <InfoRow label="Patient Name" value={user.name} />
                <InfoRow label="Patient ID" value={user.id || "N/A"} />
                <InfoRow label="National ID" value={user.nationalId || "N/A"} />
                <InfoRow label="Date of Birth" value={user.dob?.slice(0, 10) || "N/A"} />
                <InfoRow label="Blood Group" value={bloodGroup?.bloodGroup || "N/A"} />
                <div className="family-info">
                  <h3>Pregnancy Information</h3>
                  <InfoRow
                    label="Current Week"
                    value={`${pregnancyInfo?.currentWeek || "N/A"} weeks`}
                  />
                </div>
              </>
            )}
          </div>
        );

      case "contact":
        return (
          <div className="content-section">
            <h2>Contact Details</h2>
            <InfoRow label="Email" value={user?.email || contact?.email || "N/A"} />
            <InfoRow label="Phone" value={user?.phone || contact?.primaryMobile || "N/A"} />
            <InfoRow label="Secondary Phone" value={contact?.secondaryMobile || "N/A"} />
            <InfoRow label="Address" value={user?.address || contact?.address || "N/A"} />
            
            <div className="emergency-contact">
              <h3>Emergency Contact</h3>
              <InfoRow label="Name" value={contact?.emergencyContact?.name || "N/A"} isEmergency />
              <InfoRow label="Relationship" value={contact?.emergencyContact?.relationship || "N/A"} isEmergency />
              <InfoRow label="Phone" value={contact?.emergencyContact?.phone || "N/A"} isEmergency />
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
                  style={{
                    width: `${((pregnancyInfo?.currentWeek || 0) / 40) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="timeline-labels">
                <span>LMP: {pregnancyInfo?.lmp || "N/A"}</span>
                <span>EDD: {pregnancyInfo?.edd || "N/A"}</span>
              </div>
            </div>
            
            <InfoRow label="Current Week" value={`${pregnancyInfo?.currentWeek || "N/A"} weeks`} />
            <InfoRow
              label="Obstetric History"
              value={`G${pregnancyInfo?.gravida || 0}P${pregnancyInfo?.para || 0}A${pregnancyInfo?.abortions || 0}`}
            />
            
            <div className="ultrasound-dates">
              <h3>Ultrasound Dates</h3>
              {pregnancyInfo?.ultrasoundDates?.length > 0 ? (
                pregnancyInfo.ultrasoundDates.map((date, i) => (
                  <div key={i} className="date-badge">
                    {date}
                  </div>
                ))
              ) : (
                <p>No ultrasound dates recorded</p>
              )}
            </div>
          </div>
        );

      case "medical":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Medical History</h2>
              {!isEditingMedical && (
                <button className="edit-button" onClick={() => setIsEditingMedical(true)}>
                  Edit Medical History
                </button>
              )}
            </div>
            
            {isEditingMedical ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Allergies (comma separated)</label>
                  <input
                    type="text"
                    name="allergies"
                    value={editMedicalFormData.allergies}
                    onChange={handleMedicalEditChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Surgeries (comma separated)</label>
                  <input
                    type="text"
                    name="surgeries"
                    value={editMedicalFormData.surgeries}
                    onChange={handleMedicalEditChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Chronic Conditions (comma separated)</label>
                  <input
                    type="text"
                    name="chronicConditions"
                    value={editMedicalFormData.chronicConditions}
                    onChange={handleMedicalEditChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Current Medications (comma separated)</label>
                  <input
                    type="text"
                    name="medications"
                    value={editMedicalFormData.medications}
                    onChange={handleMedicalEditChange}
                  />
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={() => setIsEditingMedical(false)}>
                    Cancel
                  </button>
                  <button className="save-button" onClick={handleSaveMedicalHistory}>
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="medical-category">
                  <h3>Allergies</h3>
                  <div className="tags">
                    {medicalHistory?.allergies?.length > 0 ? (
                      medicalHistory.allergies.map((allergy, i) => (
                        <span key={i} className="tag allergy">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="tag">None recorded</span>
                    )}
                  </div>
                </div>
                
                <div className="medical-category">
                  <h3>Previous Surgeries</h3>
                  <ul className="medical-list">
                    {medicalHistory?.surgeries?.length > 0 ? (
                      medicalHistory.surgeries.map((surgery, i) => (
                        <li key={i}>{surgery}</li>
                      ))
                    ) : (
                      <li>None recorded</li>
                    )}
                  </ul>
                </div>
                
                <div className="medical-category">
                  <h3>Chronic Conditions</h3>
                  <ul className="medical-list">
                    {medicalHistory?.chronicConditions?.length > 0 ? (
                      medicalHistory.chronicConditions.map((condition, i) => (
                        <li key={i}>{condition}</li>
                      ))
                    ) : (
                      <li>None recorded</li>
                    )}
                  </ul>
                </div>
                
                <div className="medical-category">
                  <h3>Current Medications</h3>
                  <ul className="medical-list">
                    {medicalHistory?.medications?.length > 0 ? (
                      medicalHistory.medications.map((medication, i) => (
                        <li key={i}>{medication}</li>
                      ))
                    ) : (
                      <li>None recorded</li>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        );

      case "notes":
        return (
          <div className="content-section">
            <h2>Patient Notes</h2>
            <div className="notes-container">
              {notes?.length > 0 ? (
                notes.map((note, index) => (
                  <div key={index} className="note-item">
                    <div className="note-text">{note.text || note}</div>
                    <div className="note-meta">
                      {note.doctor || "Dr. Smith"} • {new Date(note.date || Date.now()).toLocaleDateString()}
                    </div>
                    {index < notes.length - 1 && <hr className="note-divider" />}
                  </div>
                ))
              ) : (
                <p>No notes available</p>
              )}
            </div>
            
            <div className="add-note-section">
              <h3>Add New Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your note here..."
                rows="4"
              />
              <button className="add-note-button" onClick={handleAddNote}>
                Add Note
              </button>
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
            <div className="user-avatar">
              {user.name?.split(' ').map(n => n[0]).join('') || "P"}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`patient-profile-container ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
                <div className="profile-photo-placeholder">
                  {user.name?.split(' ').map(n => n[0]).join('') || "P"}
                </div>
              )}
              <button className="edit-photo-btn">Edit</button>
            </div>
            <h1>{user.name}</h1>
            <p className="patient-id">ID: {user.id}</p>
            <div className="patient-status-tag">
              <span className={`status-indicator ${pregnancyInfo?.currentWeek > 20 ? "active" : ""}`}></span>
              {pregnancyInfo?.currentWeek || "N/A"} weeks
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
                Patient Notes
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