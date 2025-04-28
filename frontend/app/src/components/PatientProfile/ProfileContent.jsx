import React from 'react';
import BasicInfo from './sections/BasicInfo';
import PregnancyInfo from './sections/PregnancyInfo';
import ContactInfo from './sections/ContactInfo';
import MedicalHistory from './sections/MedicalHistory';

const ProfileContent = ({ section, patientData }) => {
  switch (section) {
    case 'basic-info':
      return <BasicInfo data={patientData} />;
    case 'pregnancy':
      return <PregnancyInfo data={patientData} />;
    case 'contact':
      return <ContactInfo data={patientData} />;
    case 'medical':
      return <MedicalHistory data={patientData} />;
    default:
      return null;
  }
};

export default ProfileContent;
