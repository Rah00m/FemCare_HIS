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
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    dob: "",
    nationalId: "",
    patientId: ""
  });
  const [editContactFormData, setEditContactFormData] = useState({
    email: "",
    phone: "",
    address: ""
  });
  const [editMedicalFormData, setEditMedicalFormData] = useState({
    allergies: "",
    surgeries: "",
    chronicConditions: "",
    medications: ""
  });
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getuserDetails();
        setPatientData(data);
        
        setEditFormData({
          name: data.user?.name || "",
          dob: data.user?.dob?.slice(0, 10) || "",
          nationalId: data.user?.nationalId || "",
          patientId: data.user?.id || ""
        });
        
        setEditContactFormData({
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          address: data.user?.address || ""
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

  const token = localStorage.getItem("token");

  const handlePhotoUpload = async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePhoto', file);
    
    try {
      const response = await fetch('http://localhost:5000/api/user/update-photo', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        setPatientData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            profilePhoto: result.profilePhoto
          }
        }));
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
      alert('An error occurred while updating the profile photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleContactEditChange = (e) => {
    const { name, value } = e.target;
    setEditContactFormData({
      ...editContactFormData,
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
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editFormData.name,
          dob: editFormData.dob,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPatientData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            name: result.user.name,
            dob: result.user.dob
          }
        }));
        setIsEditing(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };
  
  const handleSaveContactDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: editContactFormData.email,
          phone: editContactFormData.phone,
          address: editContactFormData.address
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPatientData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            email: result.user.email,
            phone: result.user.phone,
            address: result.user.address
          }
        }));
        setIsEditingContact(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving contact details:", error);
    }
  };

  const handleSaveMedicalHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/medical-history', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          allergies: editMedicalFormData.allergies.split(',').map(item => item.trim()),
          surgeries: editMedicalFormData.surgeries.split(',').map(item => item.trim()),
          chronicConditions: editMedicalFormData.chronicConditions.split(',').map(item => item.trim()),
          medications: editMedicalFormData.medications.split(',').map(item => item.trim())
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPatientData(prev => ({
          ...prev,
          medicalHistory: result.medicalHistory
        }));
        setIsEditingMedical(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving medical history:", error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/user/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newNote
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewNote("");
        setPatientData(prev => ({
          ...prev,
          notes: [...(prev.notes || []), result.note]
        }));
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note._id);
    setEditedNoteText(note.text);
  };

  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setEditedNoteText("");
  };

  const handleUpdateNote = async (noteId) => {
    if (!editedNoteText.trim()) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/user/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: editedNoteText
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPatientData(prev => ({
          ...prev,
          notes: prev.notes.map(note => 
            note._id === noteId ? { ...note, text: result.note.text } : note
          )
        }));
        setEditingNoteId(null);
        setEditedNoteText("");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/user/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPatientData(prev => ({
          ...prev,
          notes: prev.notes.filter(note => note._id !== noteId)
        }));
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!patientData || !patientData.user) {
    return <div className="loading-container">Loading patient data...</div>;
  }

  const { user, pregnancyInfo, bloodGroup, medicalHistory, notes } = patientData;

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
                    disabled 
                  />
                </div>
                <div className="form-group">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={editFormData.patientId}
                    onChange={handleEditChange}
                    disabled
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
              </>
            )}
          </div>
        );

      case "contact":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Contact Details</h2>
              {!isEditingContact && (
                <button className="edit-button" onClick={() => setIsEditingContact(true)}>
                  Edit Contact Details
                </button>
              )}
            </div>

            {isEditingContact ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editContactFormData.email}
                    onChange={handleContactEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editContactFormData.phone}
                    onChange={handleContactEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={editContactFormData.address}
                    onChange={handleContactEditChange}
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button className="cancel-button" onClick={() => setIsEditingContact(false)}>
                    Cancel
                  </button>
                  <button className="save-button" onClick={handleSaveContactDetails}>
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <InfoRow label="Email" value={user?.email || "N/A"} />
                <InfoRow label="Phone" value={user?.phone || "N/A"} />
                <InfoRow label="Address" value={user?.address || "N/A"} />
              </>
            )}
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
                    {editingNoteId === note._id ? (
                      <div className="note-edit-form">
                        <textarea
                          value={editedNoteText}
                          onChange={(e) => setEditedNoteText(e.target.value)}
                          rows="3"
                        />
                        <div className="note-edit-actions">
                          <button 
                            className="save-button small"
                            onClick={() => handleUpdateNote(note._id)}
                          >
                            Save
                          </button>
                          <button 
                            className="cancel-button small"
                            onClick={handleCancelEditNote}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="note-text">{note.text}</div>
                        <div className="note-meta">
                          {note.doctor || "Dr. Smith"} • {new Date(note.date).toLocaleDateString()}
                        </div>
                        <div className="note-actions">
                          <button 
                            className="edit-button small"
                            onClick={() => handleEditNote(note)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-button small"
                            onClick={() => handleDeleteNote(note._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
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
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <img src={babyLogo} alt="Baby Logo" className="logo-image" />
            <span className="logo-text">Saudi German Hospital</span>
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
                <div className="edit-photo-wrapper">
                  <label htmlFor="photo-upload" className="edit-photo-btn">+</label>
                  <input
  id="photo-upload"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file); // تعيين الصورة في الـ state
      handleUpdateProfile(); // إرسال الصورة مع البيانات في نفس الوقت
    }
  }}
/>


</div>
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
              <li className={activeSection === "basic-info" ? "active" : ""} onClick={() => setActiveSection("basic-info")}>
                Personal Information
              </li>
              <li className={activeSection === "pregnancy" ? "active" : ""} onClick={() => setActiveSection("pregnancy")}>
                Pregnancy Info
              </li>
              <li className={activeSection === "contact" ? "active" : ""} onClick={() => setActiveSection("contact")}>
                Contact Details
              </li>
              <li className={activeSection === "medical" ? "active" : ""} onClick={() => setActiveSection("medical")}>
                Medical History
              </li>
              <li className={activeSection === "notes" ? "active" : ""} onClick={() => setActiveSection("notes")}>
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