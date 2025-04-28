import React from 'react';

const InfoRow = ({ label, value, isEmergency = false, isLink = false }) => (
    <div className={`info-row ${isEmergency ? 'emergency' : ''}`}>
      <span className="info-label">{label}:</span>
      {isLink ? (
        <a href={`mailto:${value}`} className="info-value">{value}</a>
      ) : (
        <span className="info-value">{value}</span>
      )}
    </div>
  );

export default InfoRow;
