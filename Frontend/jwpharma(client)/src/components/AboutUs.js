import React from "react";
import "../css/aboutUs.css";
import pharma from "../assets/pharma.webp";

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="fade-in">About JW Pharma</h1>
        <div className="underline"></div>
      </div>

      <div className="about-content">
        <div className="about-image slide-in-left">
          <img src={pharma} alt="JW Pharma Facility" />
        </div>

        <div className="about-text slide-in-right">
          <h2>Leading Healthcare Innovation</h2>
          <p>
            JW Pharma has been at the forefront of pharmaceutical excellence for
            over two decades. Our commitment to quality and innovation drives us
            to develop breakthrough solutions in healthcare.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-section fade-in">
        <h2>Our Mission</h2>
        <p>
          To provide innovative pharmaceutical solutions that improve the
          quality of life for people worldwide.
        </p>
      </div>
    </div>
  );
}
