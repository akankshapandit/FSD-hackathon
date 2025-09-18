import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back to Home
      </button>

      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="fade-in">About Us</h1>
        <p className="fade-in delay-1">
          We empower small businesses with fast, AI-powered invoice tools.
          Create and share invoices seamlessly—saving time and boosting productivity.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="card fade-in delay-2">
          <h2>🚀 Our Mission</h2>
          <p>
            Simplify financial workflows with secure, instant invoice solutions
            that integrate with WhatsApp, Email, and Payment Gateways.
          </p>
        </div>

        <div className="card fade-in delay-3">
          <h2>🌍 Our Vision</h2>
          <p>
            Become the go-to invoice platform for small businesses worldwide—
            letting them focus on growth while we handle the paperwork.
          </p>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="about-values">
        <h2 className="fade-in delay-4">💡 Why Choose Us?</h2>
        <div className="value-grid">
          {[
            { icon: "⚡", title: "Instant Invoices", desc: "Generate invoices in seconds with auto-calculation." },
            { icon: "📲", title: "WhatsApp + Email", desc: "Send invoices directly to customers with one click." },
            { icon: "💳", title: "Payment Integration", desc: "Accept payments via Stripe, Razorpay, or UPI." },
            { icon: "🌐", title: "Multi-language + AI", desc: "Support multiple languages with accessibility features." },
          ].map((val, idx) => (
            <div className={`value-card fade-in delay-${5 + idx}`} key={val.title}>
              <h3>{val.icon} {val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2 className="fade-in delay-9">👨‍💻 Meet the Team</h2>
        <div className="team-grid">
          {[
            { name: "Akanksha Pandit", role: "API part" },
            { name: "Aparichita Padhee", role: "Backend Engineer" },
            { name: "Harsh Raj", role: "Frontend Engineer" },
            { name: "Akanksha Kumari", role: "abc" }
          ].map((member, idx) => (
            <div className={`team-card fade-in delay-${10 + idx}`} key={member.name}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
