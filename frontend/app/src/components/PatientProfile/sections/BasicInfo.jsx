import React from 'react';
import InfoRow from '../InfoRow';

const BasicInfo = ({ data }) => {
  return (
    <div className="content-section">
      <h2>Personal Information</h2>
      <InfoRow label="Full Name" value={data.basicInfo.full_name} />
      <InfoRow label="Date of Birth" value={`${data.dob} (Age: ${new Date().getFullYear() - new Date(data.dob).getFullYear()})`} />
      <InfoRow label="Blood Type" value={data.basicInfo.blood_type} />
      <InfoRow label="RH Factor" value={data.basicInfo.rh_factor} />
      <InfoRow label="Email" value={data.basicInfo.email} />
      <InfoRow label="Phone Number" value={data.basicInfo.phone_number} />
      <InfoRow label="Current Medications" value={data.basicInfo.current_medications.join(", ")} />
      <InfoRow label="Known Allergies" value={data.basicInfo.known_allergies.join(", ")} />
      <div className="family-info">
        <h3>Family Information</h3>
        <InfoRow label="Spouse" value={data.family.spouse} />
        <InfoRow label="Children" value={data.family.children.join(", ")} />
      </div>
    </div>
  );
};

export default BasicInfo;
