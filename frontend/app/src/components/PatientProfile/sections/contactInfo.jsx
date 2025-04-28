import React from 'react';
import InfoRow from '../InfoRow'; // Assuming you have a CSS file for styling 
const ContactInfo = ({ contact }) => {
    return (
      <div className="content-section">
        <h2>Contact Information</h2>
        <InfoRow label="Primary Phone" value={contact.primaryMobile} />
        <InfoRow label="Secondary Phone" value={contact.secondaryMobile} />
        <InfoRow label="Landline" value={contact.landline} />
        <InfoRow label="Email" value={contact.email} isLink />
        <InfoRow label="Address" value={contact.address} />
        <InfoRow label="Emergency Contact" value={contact.emergencyContact} isEmergency />
      </div>
    );
  };
  export default ContactInfo;
  