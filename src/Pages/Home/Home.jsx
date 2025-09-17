import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import card1 from '../../assets/card1.jpg';
import card2 from '../../assets/card2.jpg';
import card3 from '../../assets/card3.jpg';
import card4 from '../../assets/card4.jpg';

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);
  const featureRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set up Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all feature items
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Function to assign refs
  const setFeatureRef = (index) => (el) => {
    featureRefs.current[index] = el;
  };

  return (
    <div className="invoice-generator">
      {/* Header */}
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoiceFlow</span>
            </div>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">Modern Invoice Generation Made Simple</h1>
            <p className="hero-subheading">Create professional invoices in seconds. Send via WhatsApp or Email, accept multiple payment methods, and streamline your billing process with our AI-powered platform.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
              <button className="btn btn-secondary">Watch Demo</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Invoice Dashboard" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          
          {/* Feature 1 */}
          <div className="feature-item" ref={setFeatureRef(0)}>
            <div className="feature-text">
              <div className="feature-icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h3 className="feature-title">Professional Invoice Creation</h3>
              <p className="feature-description">
                Create detailed, professional invoices with itemized lists, quantities, prices, and automatic totals. 
                Our templates ensure your invoices look polished and include all necessary information for your clients.
              </p>
            </div>
            <div className="feature-image">
              <img src={card1} alt="Professional invoice example" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-item reverse" ref={setFeatureRef(1)}>
            <div className="feature-text">
              <div className="feature-icon">
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="feature-title">Automatic Tax & Total Calculation</h3>
              <p className="feature-description">
                Let our system handle all the calculations. Automatically add taxes, apply discounts, 
                and calculate subtotals and grand totals with precision. Customize tax rates and rules for different regions.
              </p>
            </div>
            <div className="feature-image">
              <img src={card2} alt="Invoice with tax calculation" />
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-item" ref={setFeatureRef(2)}>
            <div className="feature-text">
              <div className="feature-icon">
                <i className="fas fa-history"></i>
              </div>
              <h3 className="feature-title">Invoice History & Tracking</h3>
              <p className="feature-description">
                Keep track of all your invoices with our organized history system. Filter by status (pending/paid), 
                search by client name or invoice number, and monitor your cash flow with comprehensive reporting tools.
              </p>
            </div>
            <div className="feature-image">
              <img src={card3} alt="Invoice history and tracking" />
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="feature-item reverse" ref={setFeatureRef(3)}>
            <div className="feature-text">
              <div className="feature-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3 className="feature-title">Customizable Templates</h3>
              <p className="feature-description">
                Personalize your invoices with our customizable templates. Add your logo, choose color schemes that match your brand, 
                and even add digital signatures for a professional touch that represents your business.
              </p>
            </div>
            <div className="feature-image">
              <img src={card4} alt="Customizable invoice templates" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your free account in seconds</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Customize</h3>
              <p>Set up your business details and preferences</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Create</h3>
              <p>Generate your first invoice with our easy-to-use tools</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Send & Get Paid</h3>
              <p>Deliver invoices and receive payments faster</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-heading">Ready to Streamline Your Invoicing?</h2>
          <p className="cta-subheading">Join thousands of businesses that use InvoiceFlow to save time, get paid faster, and look professional.</p>
          <Link to="/signup" className="btn btn-light">Create Your First Invoice</Link>
        </div>
      </section>

      {/* Footer */}
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

export default Home;