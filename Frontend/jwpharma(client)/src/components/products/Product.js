import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../CartContext.js";

export default function Product() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addToCart, notification } = useContext(CartContext);
  const medicine = state?.medicine;

  if (!medicine) {
    return (
      <div className="product-container">
        <p>No product details available. Please go back.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      {notification && <div className="notification">{notification}</div>}
      <div className="product-wrapper">
        <div className="image-section">
          <img
            src={medicine.image || "/default-image.jpg"}
            alt={medicine.name}
            className="card-img-top med-img"
          />
        </div>
        <div className="info-section">
          <h1 className="product-name">{medicine.name}</h1>
          <div className="product-price">${medicine.price.toFixed(2)}</div>
          <div className="details-list">
            <div className="detail-item">
              <strong>Manufacturer:</strong>{" "}
              {medicine.manufacturer || "Unknown"}
            </div>
          </div>
          <button
            className="add-to-cart-button"
            onClick={() => {
              addToCart(medicine);
              navigate(-1);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
