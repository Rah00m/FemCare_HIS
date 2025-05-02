import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DoctorProfile.css';
import babyLogo from '../images/imgg.png';

const DoctorProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Emily Wilson",
      specialty: "Obstetrician",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Board-certified obstetrician with 15 years of experience specializing in high-risk pregnancies.",
      education: ["MD - Harvard Medical School", "Residency - Massachusetts General Hospital"],
      contact: {
        phone: "+1 (555) 123-4567",
        email: "emily.wilson@example.com",
        office: "123 Medical Center Dr, Suite 789"
      },
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM"
      },
      reviews: [
        {
          author: "Sarah Johnson",
          date: "15 March 2023",
          rating: 5,
          text: "Dr. Wilson was incredibly thorough and kind during my pregnancy."
        }
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Gynecologist",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Specializes in minimally invasive gynecologic surgery and reproductive health.",
      education: ["MD - Johns Hopkins University", "Fellowship in Gynecologic Oncology"],
      contact: {
        phone: "+1 (555) 987-6543",
        email: "michael.chen@example.com",
        office: "456 Health Plaza, Suite 101"
      },
      schedule: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM"
      },
      reviews: [
        {
          author: "Lisa Wong",
          date: "28 February 2023",
          rating: 5,
          text: "Dr. Chen performed my surgery and the results were excellent."
        }
      ]
    },
    {
      id: 3,
      name: "Dr. Sarah William",
      specialty: "Maternal-Fetal Medicine",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Expert in managing high-risk pregnancies and fetal complications.",
      education: ["MD - Stanford University", "Fellowship in Maternal-Fetal Medicine"],
      contact: {
        phone: "+1 (555) 456-7890",
        email: "sarah.william@example.com",
        office: "789 Women's Health Center, Suite 205"
      },
      schedule: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        thursday: "8:00 AM - 4:00 PM"
      },
      reviews: [
        {
          author: "Maria Garcia",
          date: "10 January 2023",
          rating: 5,
          text: "Dr. William helped me through a complicated pregnancy with expert care."
        }
      ]
    }
  ];

  useEffect(() => {
    const foundDoctor = doctorsData.find(doc => doc.id === parseInt(id));
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const renderSection = () => {
    if (!doctor) return null;

    switch(activeSection) {
      case 'profile':
        return (
          <div className="doctor-info-section">
            <h2>Professional Profile</h2>
            <div className="doctor-details">
              <img src={doctor.photo} alt={doctor.name} className="doctor-photo-large" />
              <div className="doctor-info-text">
                <h1 className="doctor-name">{doctor.name}</h1>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <p className="doctor-bio">{doctor.bio}</p>
                
                <div className="doctor-contact-info">
                  <h3>Contact Information</h3>
                  <InfoRow label="Phone" value={doctor.contact.phone} />
                  <InfoRow label="Email" value={doctor.contact.email} />
                  <InfoRow label="Office" value={doctor.contact.office} />
                </div>
              </div>
            </div>

            <div className="education-section">
              <h3>Education & Training</h3>
              <ul className="medical-list">
                {doctor.education.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="doctor-info-section">
            <h2>Office Hours</h2>
            <div className="schedule-container">
              <div className="schedule-grid">
                {Object.entries(doctor.schedule).map(([day, hours]) => (
                  <div key={day} className="schedule-day">
                    <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                    <p className="schedule-time">{hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="doctor-info-section">
            <h2>Patient Reviews</h2>
            <div className="patient-reviews">
              {doctor.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-text">{review.text}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <img 
              src={babyLogo} 
              alt="Baby Logo" 
              className="logo-image"
            />
            <span className="logo-text">HerCare Medical Center</span>
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
          <button className="nav-button" onClick={() => navigate('/')}>
            <i className="icon-calendar"></i> Home
          </button>
          <button className="nav-button">
            <i className="icon-settings"></i> Settings
          </button>
        
        </div>
      </nav>

      {/* Main Content */}
      <div className={`patient-profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◄' : '►'}
        </div>
        
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-photo-container">
              <img src={doctor.photo} alt="Doctor" className="profile-photo" />
              <button className="edit-photo-btn">Edit</button>
            </div>
            <h1>{doctor.name}</h1>
            <p className="patient-id">ID: DOC{doctor.id.toString().padStart(6, '0')}</p>
            <div className="patient-status-tag">
              <span className="status-indicator active"></span>
              {doctor.specialty}
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li 
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                Professional Profile
              </li>
              <li 
                className={activeSection === 'schedule' ? 'active' : ''}
                onClick={() => setActiveSection('schedule')}
              >
                Office Hours
              </li>
              <li 
                className={activeSection === 'reviews' ? 'active' : ''}
                onClick={() => setActiveSection('reviews')}
              >
                Patient Reviews
              </li>
            </ul>
          </nav>
        </aside>

        <main className="doctor-profile-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);

export default DoctorProfile;