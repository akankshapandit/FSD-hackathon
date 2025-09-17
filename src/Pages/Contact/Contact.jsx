import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* ✅ Back Button with reduced spacing */}
      <div className="back-button-container">
        <Link to="/home" className="btn-back-link">
          <button className="btn-back">
            <i className="fas fa-arrow-left"></i> Back to Homepage
          </button>
        </Link>
      </div>

      <header className="contact-header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <i className="fas fa-receipt"></i>
              <span>InvoiceFlow</span>
            </div>
            <ul className="nav-links">
              {/* Navigation links removed as per request */}
            </ul>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Have questions or need assistance? We're here to help you succeed.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of the following channels:</p>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>harshrajforofficial@gmail.com</p>
                  <p>harshraj9060@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h3>Office</h3>
                  <p>CMR Institute of Technology</p>
                  <p>Banglore</p>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>InvoiceFlow</h3>
              <p>The modern invoice generation platform for small businesses and freelancers.</p>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><a href="#">Templates</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul className="footer-links">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#">Careers</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023 InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;