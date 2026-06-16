import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2> Shoyu</h2>

          <p>
            Shoyu brings your favorite restaurants closer to you.
            Order delicious food with fast delivery and enjoy an
            exceptional dining experience from the comfort of your home.
          </p>

          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Company */}
        

        {/* Legal */}
        <div className="footer-column">
          <h3>Legal</h3>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Refund Policy</a>
          <a href="/">Cookie Policy</a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="/">About Us</a>
          <a href="/">Careers</a>
          <a href="/">Team</a>
          <a href="/">Blog</a>
          <a href="/">Contact</a>
        </div>

        {/* Cities */}
        <div className="footer-column">
          <h3>Available In</h3>
          <p>Hyderabad</p>
          <p>Bengaluru</p>
          <p>Chennai</p>
          <p>Vijayawada</p>
          <p>Visakhapatnam</p>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <p>📧 support@shoyu.com</p>
          <p>📞 +91 98765 43210</p>
          <p>🕒 24/7 Customer Support</p>
        </div>

        {/* Download */}
        <div className="footer-download">
          <h3>Download Our App</h3>

          <div className="app-buttons">
            <img
              src="/footer1.avif"
              alt="Google Play"
              className="store-btn"
            />

            <img
              src="/footer2.avif"
              alt="App Store"
              className="store-btn"
            />
          </div>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 Shoyu Restaurant Pvt. Ltd. All Rights Reserved.</p>

        <div className="footer-bottom-links">
          <a href="/">Help</a>
          <a href="/">FAQs</a>
          <a href="/">Partner With Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;