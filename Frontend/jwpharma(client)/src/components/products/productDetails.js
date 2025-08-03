import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../CartContext.js";

export default function ProductDetails() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const { addToCart, notification } = useContext(CartContext);
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/api/medicines/${id}`) // Fetch medicine by ID
      .then((response) => {
        if (!response.ok) {
          throw new Error("Medicine not found");
        }
        return response.json();
      })
      .then((data) => setMedicine(data))
      .catch((err) => setError("Failed to load medicine details"));
  }, [id]);

  if (error) {
    return (
      <div className="product-container">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>
    );
  }

  if (!medicine) {
    return <p>Loading...</p>;
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
            src={
              medicine.image
                ? `data:image/jpeg;base64,${medicine.image}`
                : "/default-image.jpg"
            }
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
