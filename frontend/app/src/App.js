import React, { useState } from 'react';
import './App.css';
import PatientProfile from './components/PatientProfile/PatientProfile';
// ------------------- InfoRow Component -------------------


// ------------------- App Component (Entry Point) -------------------
const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const patientData = {
    id: "PT-0001",
    name: "Jane Smith",
    dob: "1987-06-15",
    basicInfo: {
      full_name: "Jane Alexandra Smith",
      blood_type: "O",
      rh_factor: "+",
      email: "jane.smith@example.com",
      phone_number: "555-1234",
      current_medications: ["Iron Supplement", "Prenatal Vitamin"],
      known_allergies: ["Peanuts", "Latex"],
      family: {
        spouse: "John Smith",
        children: ["Alice Smith"]
      }
    },
    pregnancyInfo: {
      currentWeek: 24,
      lmp: "2024-10-01",
      edd: "2025-07-08",
      ultrasoundDates: ["2025-01-10", "2025-03-05", "2025-04-20"],
      complications: ["Gestational diabetes"]
    },
    contact: {
      primaryMobile: "555-2345",
      secondaryMobile: "555-6789",
      landline: "555-0000",
      email: "jane.smith@example.com",
      address: "123 Maple Street, Springfield",
      emergencyContact: "John Smith - 555-2345"
    },
    medicalHistory: {
      allergies: ["Penicillin", "Shellfish"],
      medications: ["Labetalol"],
      surgeries: ["Appendectomy (2005)"],
      conditions: ["Hypertension"],
      immunizations: ["Flu Shot", "Tdap"]
    },
    obstetricHistory: {
      gravida: 2,
      para: 1,
      abortions: 0,
      living_children: 1
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <PatientProfile patientData={patientData} onLogout={() => setLoggedIn(false)} />
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default App;


