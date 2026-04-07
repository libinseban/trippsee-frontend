import React from "react";
import "../style/footer.css";
import { FaInstagram } from "react-icons/fa";
import logo from "../public/logo.jpg";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}

        <div className="footer-brand">

          <div className="footer-logo">
            {/* <div className="logo-box"><img src={logo} alt="Trippsee Logo" /></div> */}
            <h2>Trippsee</h2>
          </div>

          <p>
            Your trusted companion for authentic Kerala homestay
            experiences.
          </p>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#about">About Us</a>
          <a href="/terms-conditions">Terms & Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>

        </div>


        {/* CONTACT */}

        <div className="footer-contact" id="contact">

          <h3>Contact</h3>

<a
  href="mailto:trippseeofficial@gmail.com"
  onClick={(e) => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=trippseeofficial@gmail.com");
  }}
  className="email-link"
>
  trippseeofficial@gmail.com
</a>

          <a
            href="https://www.instagram.com/trippsee_?igsh=MTdwbmEwbXE5enQxYQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <FaInstagram className="insta-icon"/>
           <span className="insta-text"> @trippsee_</span>
          </a>

<a
  href="https://wa.me/918089813888?text=Hi%20I%20want%20to%20book%20a%20homestay"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp"
>
 <FaWhatsapp className="whatsapp-icon" />
  <span className="whatsapp-text"> Trippsee Customer Care Support</span>
</a>
        </div>

      </div>


      {/* BOTTOM COPYRIGHT */}

      <div className="footer-bottom">

        © 2025 Trippsee. All rights reserved. Made with ❤️ in Kerala

      </div>

    </footer>
  );
}

export default Footer;