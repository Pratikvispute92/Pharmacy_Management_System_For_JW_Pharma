import React, { useState, useEffect } from "react";
import "../css/TrackingOrder.css";

const dummyTrackingData = {
  orderId: "ORD12345",
  status: "In Transit",
  estimatedArrival: "2024-12-31",
  progress: 65,
  currentLocation: {
    latitude: 12.9716,
    longitude: 77.5946,
    city: "Bangalore",
    state: "Karnataka",
  },
  trackingHistory: [
    { date: "2024-12-20", location: "Mumbai", status: "Shipped" },
    { date: "2024-12-22", location: "Pune", status: "In Transit" },
    {
      date: "2024-12-25",
      location: "Bangalore",
      status: "Arrived at Sorting Center",
    },
  ],
};

export default function TrackingOrder() {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTrackingData(dummyTrackingData);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (trackingData) {
      setTimeout(() => {
        setProgressWidth(trackingData.progress);
      }, 200);
    }
  }, [trackingData]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-pulse"></div>
        <div className="loading-text">Loading tracking information...</div>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <h1 className="tracking-title">Track Your Order</h1>

      <div className="order-info-card">
        <h3>Order ID: {trackingData.orderId}</h3>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>Ordered</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        <div className="status-badge">
          <span
            className={`status ${trackingData.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {trackingData.status}
          </span>
        </div>

        <div className="real-time-updates">
          <div className="pulse-dot"></div>
          <span>Live Tracking Active</span>
        </div>
      </div>

      <div className="map-container">
        <div className="location-indicator">
          <div className="ripple"></div>
          <div className="current-location-dot"></div>
        </div>
        <h4>Current Location: {trackingData.currentLocation.city}</h4>
        <div className="map-section">
          <div className="map-wrapper">
            <iframe
              title="Order Location"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${trackingData.currentLocation.latitude},${trackingData.currentLocation.longitude}`}
              className="google-map"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="location-details">
            <div className="location-card">
              <h4>Current Location</h4>
              <p>
                {trackingData.currentLocation.city},{" "}
                {trackingData.currentLocation.state}
              </p>
              <div className="coordinates">
                <span>{trackingData.currentLocation.latitude}°N</span>
                <span>{trackingData.currentLocation.longitude}°E</span>
              </div>
            </div>
          </div>
        </div>
        <div className="map-placeholder">
          <span>Interactive Map</span>
        </div>
      </div>

      <div className="tracking-history">
        <h4>Tracking History</h4>
        <div className="timeline">
          {trackingData.trackingHistory.map((entry, index) => (
            <div
              key={index}
              className="timeline-item"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-dot">
                <div className="inner-dot"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-location">{entry.location}</div>
                <div className="timeline-status">{entry.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
