import React from 'react';
import './Contact.css'; // هنفصل الستايل في ملف CSS خارجي
import Backs from './Backs';
import Navbar from './Navbar';
const Contact = ({landingRef,setShowAuthForms }) => {
  return (
    <>
  <div style={{ position: "relative" }}>
    <Navbar landingRef={landingRef} setShowAuthForms={setShowAuthForms} />
<Backs landingRef={landingRef} curved={true} />
    {/* <div className="landing-curve-text">Contact Us</div> */}
  </div>
 <div className="contact-main-section">
  <div className="contact-image">
    <img src={require('../images/contact.png')} alt="Contact Us" />
  </div>

  <div className="contact-container">
    <div className="contact-box">
      <h2>Contact Us</h2>
      <p>If you have any questions or want to get in touch, please fill out the form below and we will respond as soon as possible.</p>
      <form>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="example@email.com" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

        <button type="submit" className="submit-btn">Send</button>
      </form>
    </div>
  </div>
</div>
          <div className="contact-info-boxes">
          <div className="info-box">
            <h3>Phone</h3>
            <p>Start working with Medicare that can provide everything</p>
            <p className="highlight">+152 534-468-854</p>
          </div>

          <div className="info-box">
            <h3>Email</h3>
            <p>Start working with Medicare that can provide everything</p>
            <p className="highlight">contact@example.com</p>
          </div>
        </div>
      
    </>
  );
};

export default Contact;
