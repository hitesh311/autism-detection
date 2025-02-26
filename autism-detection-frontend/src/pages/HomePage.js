import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";
import welcomeImage from "../assets/welcome.png";

const HomePage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Autism Detection</h1>
            <p>AI-powered autism detection using facial analysis.</p>
            <button className="cta-button" onClick={() => navigate("/Login")}>
              Get Started
            </button>
          </div>
          <div className="hero-image">
            <img src={welcomeImage} alt="Welcome" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-box">
            <h3>Facial Expression Analysis</h3>
            <p>Analyze emotions to detect autism patterns.</p>
          </div>
          <div className="feature-box">
            <h3>Eye Movement Detection</h3>
            <p>Track eye movements for real-time insights.</p>
          </div>
          <div className="feature-box">
            <h3>Secure Reports</h3>
            <p>View past assessments anytime from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Upload Image</h3>
            <p>Choose a clear photo to analyze.</p>
          </div>
          <div className="step">
            <h3>2. AI Analysis</h3>
            <p>Our AI model processes facial expressions.</p>
          </div>
          <div className="step">
            <h3>3. Get Results</h3>
            <p>Receive an autism likelihood assessment.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Start Your Analysis Today</h2>
        <button className="cta-button" onClick={() => navigate("/dashboard")}>
          Try Now
        </button>
      </section>
    </div>
  );
};

export default HomePage;
