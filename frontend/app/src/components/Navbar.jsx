import React from 'react';
import babyLogo from '../assets/img/babyLogo.png';

const Navbar = ({ onLoginClick }) => (
  <nav className="top-nav">
    <div className="nav-left">
      <div className="logo">
        <img src={babyLogo} alt="Baby Logo" className="logo-image" />
        <span className="logo-text">Obstetrics and Gynecology</span>
      </div>
      <div className="nav-links">
        <a href="#office">Locations</a>
        <a href="#services">Services</a>
        <a href="#specialties">Find an obstetrician</a>
        <a href="#pricing">Appointments</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
      </div>
    </div>
    <div className="nav-right">
      <button>Home</button>
      <button onClick={onLoginClick}>Login</button>
      <button>Settings</button>
    </div>
  </nav>
);

export default Navbar;
