import React, { useState } from 'react';

const AuthForm = ({ onSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', dob: '', password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <div className="auth-tabs">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
          </>
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLogin ? 'SIGN IN' : 'SIGN UP'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
