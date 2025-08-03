import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { notification, setNotification } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token && userId) {
      fetchCart();
    } else {
      setNotification("Please login to view your cart.");
      navigate("/loginpage");
    }
  }, [token, userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/cart/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart.");
    }
  };

  const handleQuantityChange = (productId, quantityChange) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(
            1,
            (item.quantity || 1) + quantityChange
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/cart/remove/${userId}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(cart.filter((item) => item.id !== productId));
      toast.success("Product removed successfully.");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product.");
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/cart/clear/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
      toast.success("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );

  const handleCheckout = () => {
    if (!token) {
      setNotification("Please login to proceed to checkout.");
      navigate("/loginpage");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {notification && <div className="notification">{notification}</div>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <h3>{item.name}</h3>
                  <span>₹{item.price ? item.price.toFixed(2) : "0.00"}</span>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <span>
                    Total: ₹
                    {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Price: ₹{calculateTotal().toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="checkout-btn"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="clear-cart-btn"
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
