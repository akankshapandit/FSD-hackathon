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
    <div className="contact-pagec">
      {/* ✅ Back Button with reduced spacing */}
      <div className="back-button-containerc">
        <Link  className="btn-back-link">
          <button className="btn-back" onClick={()=>window.history.back()}>
             Back 
          </button>
        </Link>
      </div>

      <header className="contact-headerc">
        <div className="containerc">
          <nav className="navbarc">
            <div className="logoc">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoiceFlow</span>
            </div>
            <ul className="nav-linksc">
              {/* Navigation links removed as per request */}
            </ul>
            <div className="auth-buttonsc">
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="contact-heroc">
        <div className="containerc">
          <h1 className="contact-titlec">Get in Touch</h1>
          <p className="contact-subtitlec">Have questions or need assistance? We're here to help you succeed.</p>
        </div>
      </section>

      <section className="contact-contentc">
        <div className="containerc">
          <div className="contact-gridc">
            <div className="contact-infoc">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of the following channels:</p>
              
              <div className="contact-methodc">
                <div className="contact-iconc">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-detailsc">
                  <h3>Email</h3>
                  <p>harshrajforofficial@gmail.com</p>
                  <p>harshraj9060@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-methodc">
                <div className="contact-iconc">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-detailsc">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="contact-methodc">
                <div className="contact-iconc">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-detailsc">
                  <h3>Office</h3>
                  <p>CMR Institute of Technology</p>
                  <p>Banglore</p>
                </div>
              </div>
              
              <div className="social-linksc">
                <h3>Follow Us</h3>
                <div className="social-iconsc">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-containerc">
              <h2>Send us a Message</h2>
              <form className="contact-formc" onSubmit={handleSubmit}>
                <div className="form-rowc">
                  <div className="form-groupc">
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
                  
                  <div className="form-groupc">
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
                
                <div className="form-groupc">
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
                
                <div className="form-groupc">
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

      <footer className="footerc">
        <div className="containerc">
          <div className="footer-contentc">
            <div className="footer-columnc">
              <h3>InvoiceFlow</h3>
              <p>The modern invoice generation platform for small businesses and freelancers.</p>
              <div className="social-iconsc">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footer-columnc">
              <h3>Product</h3>
              <ul className="footer-linksc">
                <li><a href="#featuresc">Features</a></li>
                <li><Link to="/pricingc">Pricing</Link></li>
                <li><a href="#">Templates</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            <div className="footer-columnc">
              <h3>Resources</h3>
              <ul className="footer-linksc">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            <div className="footer-columnc">
              <h3>Company</h3>
              <ul className="footer-linksc">
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#">Careers</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="copyrightc">
            <p>&copy; 2023 InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;