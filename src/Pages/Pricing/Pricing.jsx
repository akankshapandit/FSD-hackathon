import React from 'react';
import './Pricing.css';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";


const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for freelancers and small businesses just getting started",
      featurespr: [
        "5 invoices per month",
        "Basic templates",
        "Email delivery",
        "PDF download",
        "Basic support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "₹200",
      period: "per month",
      description: "Ideal for growing businesses with more invoicing needs",
      featurespr: [
        "Unlimited invoices",
        "Premium templates",
        "Email + WhatsApp delivery",
        "Auto-tax calculation",
        "Multi-language support",
        "Priority support"
      ],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Business",
      price: "₹500",
      period: "per month",
      description: "For established businesses with advanced needs",
      featurespr: [
        "Everything in Pro",
        "Custom branding",
        "Team members (up to 5)",
        "Advanced analytics",
        "Zoho/Invoice Ninja integration",
        "API access",
        "Dedicated account manager"
      ],
      cta: "Get Started",
      popular: false
    }
  ];

  return (
    <div className="pricing-page">
      <div className="back-button-container">
  <Link to={"/home"}><button 
    className="btn-back" 
    onClick={() => window.history.back()}
  >
    Back 
  </button></Link>
</div>

      <section className="pricing-hero">
        <div className="container">
          <h1 className="pricing-title">Simple, Transparent Pricing</h1>
          <p className="pricing-subtitle">Choose the plan that works best for your business</p>
          
          <div className="pricing-toggle">
            <span className="toggle-option active">Monthly</span>
            <div className="toggle-switch">
              <div className="toggle-handle"></div>
            </div>
            <span className="toggle-option">Annual (Save 20%)</span>
          </div>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                
                {console.log("Plan Features:", plan.features)}
<ul className="plan-features">
  {plan.featurespr.map((feature, i) => (
    <li key={i} className="featurepr-item">
      <FaCheck className="check-icon" />
      <span>{feature}</span>
    </li>
  ))}
</ul>

                
                <button className={`btn plan-cta ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change plans anytime?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is there a setup fee?</h3>
              <p>No, there are no setup fees or hidden charges. You only pay the monthly subscription fee.</p>
            </div>
            
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer discounts for non-profits?</h3>
              <p>Yes, we offer a 25% discount for registered non-profit organizations. Contact our sales team for more information.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I cancel my subscription?</h3>
              <p>Yes, you can cancel your subscription at any time. There are no cancellation fees.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>Absolutely. We use bank-level encryption and secure servers to protect all your data and financial information.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;