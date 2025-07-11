import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import Backs from "./Backs";
import Navbar from "./Navbar";
const Home = () => {
  // const [scrollCase, setScrollCase] = useState(false);
  const landingRef = React.useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const [nationalId, setNationalId] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Wilson",
      specialty: "Obstetrician",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Board-certified obstetrician with 15 years of experience specializing in high-risk pregnancies.",
      education: [
        "MD - Harvard Medical School",
        "Residency - Massachusetts General Hospital",
      ],
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM",
      },
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Gynecologist",
      photo:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Specializes in minimally invasive gynecologic surgery and reproductive health.",
      education: [
        "MD - Johns Hopkins University",
        "Fellowship in Gynecologic Oncology",
      ],
      schedule: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        friday: "8:00 AM - 12:00 PM",
      },
    },
    {
      id: 3,
      name: "Dr. Sarah William",
      specialty: "Maternal-Fetal Medicine",
      photo:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Expert in managing high-risk pregnancies and fetal complications.",
      education: [
        "MD - Stanford University",
        "Fellowship in Maternal-Fetal Medicine",
      ],
      schedule: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        thursday: "8:00 AM - 4:00 PM",
      },
    },
  ];

  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   try{
  //     const response = await axios.post('http://localhost:5000/api/login', {
  //       email,
  //       password,
  //     });
  //     const { token,role } = response.data;
  //     localStorage.setItem('token', token);
  //     if (role === 'patient') {
  //       navigate('/patient-profile');
  //     } else {
  //       // إضافة المنطق للـ doctor أو الـ admin إذا كان ذلك مطلوبًا
  //     }
  //   }catch (error) {
  //     console.error("Error logging in:", error);
  //     alert("Login failed. Please try again.");
  //   }
  //   };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token, role } = response.data;
      console.log("Token:", token);
      localStorage.setItem("token", token); // حفظ التوكن في الlocalStorage
      if (role === "patient") {
        navigate("/patient-profile"); // التوجيه إلى صفحة الملف الشخصي للمريض
      } else if (role === "doctor") {
        navigate("/doctor-profile"); // التوجيه إلى صفحة الملف الشخصي للطبيب
      } else {
        // إضافة المنطق للـ doctor أو الـ admin إذا كان ذلك مطلوبًا
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!profilePhoto) {
      alert("Please upload a profile photo.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("password", password);
    formData.append("nationalId", nationalId);
    formData.append('address', address);
    formData.append("profilePhoto", profilePhoto);
    console.log("Profile Photo:", profilePhoto);       
    console.log("Form data being sent:", formData);
    if (!profilePhoto) {
      alert("Please upload a profile photo.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      const { token, role } = response.data;
      console.log("Token:", token);
      localStorage.setItem("token", token); 
      if (role === "patient") {
        navigate("/patient-profile");
      } else if (role === "doctor") {
        navigate("/doctor-profile");
      } else {
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response ? error.response.data : error.message
      );
      alert("Sign Up failed. Please try again.");
    }
  };

  // View doctor profile
  const handleViewProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <>
    
    <div className="app-container">
            <Navbar setShowAuthForms={setShowAuthForms}
            landingRef={landingRef} />
<Backs landingRef={landingRef} curved={false} />
      {/* Doctor Profiles Section */}
      <div className="doctors-container">
        <h2 className="doctors-title">Our Specialists</h2>
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-photo-container">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="doctor-photo"
                />
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
                className={`auth-tab ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`auth-tab ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="pink-login-box">
              {isLogin ? (
                // LOGIN FORM
                <form onSubmit={handleLogin} className="pink-form">
                  <h2>Welcome Back!</h2>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>

                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">
                      f
                    </button>
                    <button type="button" className="pink-social-btn">
                      G+
                    </button>
                    <button type="button" className="pink-social-btn">
                      in
                    </button>
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

                  <button type="submit" className="pink-submit-btn">
                    SIGN IN
                  </button>
                </form>
              ) : (
                // SIGNUP FORM
                <form onSubmit={handleSignUp} className="pink-form">
                  <h2>Create Account</h2>

                  <div className="pink-social-login">
                    <button type="button" className="pink-social-btn">
                      f
                    </button>
                    <button type="button" className="pink-social-btn">
                      G+
                    </button>
                    <button type="button" className="pink-social-btn">
                      in
                    </button>
                  </div>

                  <div className="pink-divider">
                    or use your email for registration
                  </div>

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
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  <input
                    type="text"
                    placeholder="National ID"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />

                  <button type="submit" className="pink-submit-btn">
                    SIGN UP
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    {/* </div> */}
    </div>
    </>
    
  );
};

export default Home;
