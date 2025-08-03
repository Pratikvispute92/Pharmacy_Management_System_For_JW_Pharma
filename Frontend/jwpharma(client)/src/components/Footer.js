import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  function contact() {
    navigate(`/contactUs`);
    window.scroll(0, 0);
  }
  function about() {
    navigate(`/aboutUs`);
    window.scroll(0, 0);
  }

  return (
    <footer className="footer">
      <div className="footer-section">
        <h1>JW PHARMA</h1>
        <ul className="footer-contact">
          <li>
            <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-64.png"
              alt="call"
              height={20}
              width={20}
            />{" "}
            +91 9307579433
          </li>
          <li>
            <img
              src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-58-64.png"
              alt="email"
              height={20}
              width={20}
            />{" "}
            jwpharma@gmail.com
          </li>
          <li>
            <img
              src="https://cdn4.iconfinder.com/data/icons/picons-social/57/23-whatsapp-2-64.png"
              alt="whatsapp"
              height={20}
              width={20}
            />{" "}
            WhatsApp
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h1>Quick Links</h1>
        <ul>
          <li onClick={about}>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
          <li onClick={contact}>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h1>Shopping</h1>
        <ul>
          <li>Offers/Coupons</li>
          <li>Health Tips</li>
          <li>Popular Brands</li>
          <li>Most Selling</li>
        </ul>
      </div>
      <div className="footer-section">
        <h2>Follow us on</h2>
        <ul className="social-icons">
          <li>
            <img
              src="https://cdn1.iconfinder.com/data/icons/ionicons-fill-vol-2/512/logo-facebook-64.png"
              alt="facebook"
              height={30}
              width={30}
            />
          </li>
          <li>
            <img
              src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-3-64.png"
              alt="instagram"
              height={30}
              width={30}
            />
          </li>
          <li>
            <img
              src="https://cdn3.iconfinder.com/data/icons/brands-applications/512/linked_in-64.png"
              alt="linkedin"
              height={30}
              width={30}
            />
          </li>
          <li>
            <img
              src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Twitter_svg-64.png"
              alt="twitter"
              height={30}
              width={30}
            />
          </li>
          <li>
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Youtube_glyph_svg-64.png"
              alt="youtube"
              height={30}
              width={30}
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
