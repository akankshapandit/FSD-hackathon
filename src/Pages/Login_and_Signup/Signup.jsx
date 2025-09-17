import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // Signup logic would go here
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <Link to="/" className="signup-logo">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoiceFlow</span>
            </Link>
            <h1>Create Account</h1>
            <p>Get started with your free account today</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username <i className="fas fa-user"></i></label>
              <div className="input-with-icon">
                
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address <i className="fas fa-envelope"></i></label>
              <div className="input-with-icon">
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password <i className="fas fa-lock"></i></label>
              <div className="input-with-icon">
                
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="password-hint">
                Must be at least 8 characters with a number and symbol
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password <i className="fas fa-lock"></i></label>
              <div className="input-with-icon">
                
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                I agree to the <Link to="/terms" className="inline-link">Terms of Service</Link> and <Link to="/privacy" className="inline-link">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-signup">Create Account</button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="signup-link">Sign in here</Link></p>
          </div>
        </div>

        <div className="signup-graphics">
          <div className="graphics-content">
            <h2>Start Invoicing Like a Pro</h2>
            <p>Join thousands of businesses that use InvoiceFlow to save time, get paid faster, and look professional.</p>
            <div className="graphics-features">
              <div className="graphics-feature">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Professional Invoice Templates</span>
              </div>
              <div className="graphics-feature">
                <i className="fas fa-mobile-alt"></i>
                <span>Mobile Responsive Design</span>
              </div>
              <div className="graphics-feature">
                <i className="fas fa-shield-alt"></i>
                <span>Bank-Level Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;