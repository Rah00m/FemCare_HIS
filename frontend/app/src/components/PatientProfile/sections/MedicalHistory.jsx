import React from 'react';

const MedicalHistory = ({ medicalHistory }) => {
    return (
      <div className="content-section">
        <h2>Medical History</h2>
        <div className="medical-category">
          <h3>Allergies</h3>
          <div className="tags">
            {medicalHistory.allergies.map((a, i) => (
              <span key={i} className="tag allergy">{a}</span>
            ))}
          </div>
        </div>
        <div className="medical-category">
          <h3>Current Medications</h3>
          <div className="tags">
            {medicalHistory.medications.map((m, i) => (
              <span key={i} className="tag medication">{m}</span>
            ))}
          </div>
        </div>
        <div className="medical-category">
          <h3>Previous Surgeries</h3>
          <ul className="medical-list">
            {medicalHistory.surgeries.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="medical-category">
          <h3>Medical Conditions</h3>
          <div className="tags">
            {medicalHistory.conditions.map((c, i) => (
              <span key={i} className="tag condition">{c}</span>
            ))}
          </div>
        </div>
        <div className="medical-category">
          <h3>Immunizations</h3>
          <div className="tags">
            {medicalHistory.immunizations.map((i, idx) => (
              <span key={idx} className="tag immunization">{i}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
export default MedicalHistory;
