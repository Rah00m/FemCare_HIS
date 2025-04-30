import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import babyLogo from '../images/imgg.png';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Wilson",
      specialty: "Obstetrician",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Board-certified obstetrician with 15 years of experience specializing in high-risk pregnancies.",
      education: ["MD - Harvard Medical School", "Residency - Massachusetts General Hospital"],
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM"
      }
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Gynecologist",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Specializes in minimally invasive gynecologic surgery and reproductive health.",
      education: ["MD - Johns Hopkins University", "Fellowship in Gynecologic Oncology"],
      schedule: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM"
      }
    },
    {
      id: 3,
      name: "Dr. Sarah William",
      specialty: "Maternal-Fetal Medicine",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Expert in managing high-risk pregnancies and fetal complications.",
      education: ["MD - Stanford University", "Fellowship in Maternal-Fetal Medicine"],
      schedule: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        thursday: "8:00 AM - 4:00 PM"
      }
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in with ${email}`);
      navigate('/patient-profile');
    } else {
      alert(`Signing up as ${name}\nPhone: ${phone}\nDOB: ${dob}`);
      navigate('/patient-profile');
    }
    setShowAuthForms(false);
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

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
            <span className="logo-text">Obstetrics and Gynecology</span>
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
          <button className="nav-button">
            <span>Home</span>
          </button>
          <button 
            className="nav-button login-btn"
            onClick={() => setShowAuthForms(!showAuthForms)}
          >
            <span>Login</span>
          </button>
          <button className="nav-button">
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Department Title */}
      <div className="department-title">
        <h1>Department of Obstetrics and Gynecology</h1>
      </div>

      {/* Doctor Profiles Section */}
      <div className="doctors-container">
        <h2 className="doctors-title">Our Specialists</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-photo-container">
                <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <button 
                  className="view-profile-btn"
                  onClick={() => handleViewProfile(doctor.id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Forms (hidden by default) */}
      {showAuthForms && (
        <div className="auth-forms-overlay">
          <div className="auth-forms-container">
            <button 
              className="close-auth-btn"
              onClick={() => setShowAuthForms(false)}
            >
              ×
            </button>
            
            {/* Login/Register Tabs */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="pink-login-box">
              {isLogin ? (
                // LOGIN FORM
                <form onSubmit={handleSubmit} className="pink-form">
                  <h2>Welcome Back!</h2>
                  <p>To keep connected with us please login with your personal info</p>
                  
                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">f</button>
                    <button type="button" className="pink-social-btn">G+</button>
                    <button type="button" className="pink-social-btn">in</button>
                  </div>

                  <div className="pink-divider">or use your email</div>

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button type="submit" className="pink-submit-btn">SIGN IN</button>
                </form>
              ) : (
                // SIGNUP FORM
                <form onSubmit={handleSubmit} className="pink-form">
                  <h2>Create Account</h2>
                  
                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">f</button>
                    <button type="button" className="pink-social-btn">G+</button>
                    <button type="button" className="pink-social-btn">in</button>
                  </div>

                  <div className="pink-divider">or use your email for registration</div>

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button type="submit" className="pink-submit-btn">SIGN UP</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;