import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext.js";
import "../css/General.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function General() {
  const { addToCart, notification } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/medicines")
      .then((response) => {
        const generalProducts = response.data.filter(
          (product) => product.category === "General Product"
        );
        setProducts(generalProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="general-container">
      <h1 className="title">General Products</h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No general products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image ? (
                <img
                  src={`data:image/png;base64,${product.image}`} // Convert byte[] to image if stored in backend
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <img
                  src="/placeholder.jpg" // Fallback image
                  alt="Placeholder"
                  className="product-image"
                />
              )}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(product);
                    window.scroll(0, 0);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
