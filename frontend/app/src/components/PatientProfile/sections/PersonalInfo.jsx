import InfoRow from '../InfoRow';

const PersonalInfo = ({ basicInfo, dob }) => {
    return (
      <div className="content-section">
        <h2>Personal Information</h2>
        <InfoRow label="Full Name" value={basicInfo.full_name} />
        <InfoRow label="Date of Birth" value={`${dob} (Age: ${new Date().getFullYear() - new Date(dob).getFullYear()})`} />
        <InfoRow label="Blood Type" value={basicInfo.blood_type} />
        <InfoRow label="RH Factor" value={basicInfo.rh_factor} />
        <InfoRow label="Email" value={basicInfo.email} isLink />
        <InfoRow label="Phone Number" value={basicInfo.phone_number} />
        <InfoRow label="Current Medications" value={basicInfo.current_medications.join(", ")} />
        <InfoRow label="Known Allergies" value={basicInfo.known_allergies.join(", ")} />
        <div className="family-info">
          <h3>Family Information</h3>
          <InfoRow label="Spouse" value={basicInfo.family.spouse} />
          <InfoRow label="Children" value={basicInfo.family.children.join(", ")} />
        </div>
      </div>
    );
  };
  export default PersonalInfo;