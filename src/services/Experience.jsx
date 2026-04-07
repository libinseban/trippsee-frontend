import React from "react";
import "../style/footer.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";

function Experience() {
  return (
    <section className="experience">
      <div className="experience-container">

        <h1 className="experience-title">
          Experience the Full Platform on Mobile
        </h1>

        <p className="experience-subtitle">
          Download the Trippsee app for seamless booking, instant confirmations,<br/>
          and exclusive mobile-only deals
        </p>

        <div className="experience-buttons">

          <button className="playstore-btn">
                             <a
    href="https://play.google.com/store/apps/details?id=apps.trippsee.com"
    target="_blank"
    rel="noopener noreferrer"
    className="android"
  >
            <FaGooglePlay className="btn-icon"/>
            Download on Google Play</a>
          </button>

          <button className="appstore-btn">
                          <a
    href="https://apps.apple.com/us/app/trippsee/id6759007924"
    target="_blank"
    rel="noopener noreferrer"
    className="apple"
  >
            <FaApple className="btn-icon"/>
            Download on App Store</a>
          </button>

        </div>

      </div>
    </section>
  );
}

export default Experience;



  //  <a 
  //           href="https://play.google.com/store/apps" 
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="playstore-btn"
  //         >
  //           <FaGooglePlay className="btn-icon"/>
  //           Download on Google Play
  //         </a>