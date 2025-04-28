import React from 'react';
import InfoRow from '../InfoRow';

const PregnancyInfo = ({ data }) => {
  if (!data || !data.pregnancyInfo || !data.obstetricHistory) {
    return <div className="content-section">Pregnancy information is not available.</div>;
  }

  const { pregnancyInfo, obstetricHistory } = data;

  return (
    <div className="content-section">
      <h2>Pregnancy Information</h2>

      <div className="pregnancy-timeline">
        <div className="timeline-bar">
          <div
            className="progress"
            style={{ width: `${(pregnancyInfo.currentWeek / 40) * 100}%` }}
          ></div>
        </div>
        <div className="timeline-labels">
          <span>LMP: {pregnancyInfo.lmp}</span>
          <span>EDD: {pregnancyInfo.edd}</span>
        </div>
      </div>

      <InfoRow label="Current Week" value={`${pregnancyInfo.currentWeek} weeks`} />
      <InfoRow
        label="Obstetric History"
        value={`G${obstetricHistory.gravida}P${obstetricHistory.para}A${obstetricHistory.abortions}`}
      />
      <InfoRow label="Living Children" value={obstetricHistory.living_children} />

      <h3>Ultrasound Dates</h3>
      {pregnancyInfo.ultrasoundDates.map((date, i) => (
        <div key={i} className="date-badge">
          {date}
        </div>
      ))}

      <h3>Pregnancy Complications</h3>
      <div className="tags">
        {pregnancyInfo.complications.map((item, i) => (
          <span key={i} className="tag allergy">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PregnancyInfo;
