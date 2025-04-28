import React from 'react';
import ProfileHeader from './ProfileHeader';

const ProfileSidebar = ({ activeSection, setActiveSection, patientData }) => (
  <aside className="profile-sidebar">
    <ProfileHeader patientData={patientData} />
    <nav className="sidebar-nav">
      <ul>
        {['basic-info', 'pregnancy', 'contact', 'medical'].map(section => (
          <li
            key={section}
            className={activeSection === section ? 'active' : ''}
            onClick={() => setActiveSection(section)}
          >
            {section.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default ProfileSidebar;
