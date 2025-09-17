import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    console.log('Login submitted:', formData);
    // Login logic would go here
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
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-auth">Sign In</button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
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
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
          </div>
        </div>

        <div className="auth-graphics">
          <div className="graphics-content">
            <h2>Streamline Your Invoicing Process</h2>
            <p>Access your account to create professional invoices, track payments, and manage your business finances.</p>
            <div className="graphics-features">
              <div className="graphics-feature">
                <i className="fas fa-bolt"></i>
                <span>Instant Invoice Generation</span>
              </div>
              <div className="graphics-feature">
                <i className="fas fa-paper-plane"></i>
                <span>WhatsApp & Email Delivery</span>
              </div>
              <div className="graphics-feature">
                <i className="fas fa-chart-line"></i>
                <span>Payment Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;