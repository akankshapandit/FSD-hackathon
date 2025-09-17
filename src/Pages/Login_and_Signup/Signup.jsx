import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <i className="fas fa-receipt"></i>
              <span>InvoiceFlow</span>
            </Link>
            <h1>Create Account</h1>
            <p>Get started with your free account today</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
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
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
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

            <button type="submit" className="btn btn-primary btn-auth">Create Account</button>
          </form>

          <div className="auth-divider">
            <span>or sign up with</span>
          </div>

          <div className="social-auth">
            <button className="btn btn-google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className="btn btn-facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          </div>
        </div>

        <div className="auth-graphics">
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