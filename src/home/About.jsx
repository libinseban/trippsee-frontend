import React from "react";
import "../style/about.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <h1 className="about-title">About Trippsee</h1>

        <p className="about-description">
          Trippsee is a Kerala-based platform connecting travelers with verified
          homestays. We empower local hosts with fair
          commission and digital visibility, making authentic Kerala experiences
          accessible to everyone.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              To showcase Kerala's rich hospitality heritage while supporting
              local communities through sustainable tourism.
            </p>
          </div>

          <div className="about-card">
            <h3>Kerala First</h3>
            <p>
              We focus exclusively on Kerala, ensuring travelers experience the
              true essence of God's Own Country.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;