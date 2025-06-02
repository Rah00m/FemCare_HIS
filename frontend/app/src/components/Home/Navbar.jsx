import React,{useState,useEffect}  from "react";
import babyLogo from "../images/imgg.png";
import "./Navbar.css";
import { Link } from 'react-router-dom';
const Navbar = ({setShowAuthForms ,landingRef }) => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const sectionHeight = landingRef?.current?.offsetHeight || 0;
        const navHeight = document.querySelector(".top-nav")?.offsetHeight || 0;
          console.log({scrollTop, sectionHeight, navHeight});
        if (scrollTop < sectionHeight - navHeight) {
            setScrolled(false); //transparent
        } 
        else {
            setScrolled(true); //solid
        }
                  console.log("Should be transparent:", scrollTop < sectionHeight - navHeight);

}
        //to avoid the delay in scroll event
        setTimeout(()=>{
                                        handleScroll();
                  window.addEventListener("scroll", handleScroll);
        }
, 100);
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
}, [landingRef]);
  return (
    <nav className={`top-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <div className="logo">
          <img src={babyLogo} alt="Baby Logo" className="logo-image" />
          <span className="logo-text">HerCare Medical Center</span>
        </div>
        <div className="nav-links">
                    <a href="#specialties" className="nav-link">Find an obstetrician</a>
          <a href="#office" className="nav-link">Locations</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#pricing" className="nav-link">Appointments</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="/contact" className="nav-link">Contact Us</a>
        </div>
      </div>
      <div className="nav-right">
        
<Link to="/" className="nav-button"><span>Home</span></Link>
        <button className="nav-button login-btn" onClick={() => setShowAuthForms(prev => !prev)}>
          <span>Login</span>
        </button>
        <button className="nav-button"><span>Settings</span></button>
      </div>
    </nav>
  );
};

export default Navbar;