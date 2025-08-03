import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../css/Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });
  const [detailsSaved, setDetailsSaved] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/cart/${userId}`
      );
      setCart(response.data.products || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to load cart. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty!");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const deliveryData = {
      ...formData,
      orderItems: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
      })),
      totalAmount: calculateTotal(),
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/delivery",
        deliveryData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        toast.success("Delivery details saved successfully!");
        setDetailsSaved(true);
      } else {
        toast.error("Failed to save delivery details!");
      }
    } catch (error) {
      console.error("Error submitting delivery details:", error);
      toast.error(
        error.response?.data || "An error occurred. Please try again."
      );
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + (item.price || 0), 0);

  const handlePayment = async () => {
    const totalAmount = calculateTotal(); // Get total amount from cart

    if (!totalAmount || totalAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true); // ✅ Make sure setLoading is used properly

    try {
      // Create order in backend
      const response = await axios.post(
        "http://localhost:9000/api/payment/create-order",
        {
          amount: totalAmount * 100, // Convert to paise
        }
      );

      const orderId = response.data.orderId; // Extract order ID
      console.log("Order created:", orderId);

      if (!orderId) {
        alert("Failed to create order. Try again.");
        return;
      }

      const options = {
        key: "rzp_test_r8uNONct0Exne8", // Replace with Razorpay key
        amount: totalAmount * 100,
        currency: "INR",
        name: "Pharmacy Checkout",
        description: "Complete your payment",
        order_id: orderId,
        handler: async function (response) {
          console.log("Payment successful:", response);

          try {
            // Send payment verification request to backend
            await axios.post(
              "http://localhost:9000/api/payment/verify-payment",
              {
                orderId: orderId,
                paymentId: response.razorpay_payment_id,
              }
            );

            alert("Payment successful!");
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false); // ✅ Ensure loading state is reset
    }
  };

  return (
    // prefill: {
    //   name: formData.name,
    //   email: formData.email,
    //   contact: formData.phone,
    // },
    <>
      <section className="checkout-section">
        <h2>Checkout</h2>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
            ))
          )}
          <div className="total-amount">
            <strong>Total: ₹{calculateTotal().toFixed(2)}</strong>
          </div>
        </div>

        <h3>Delivery Details</h3>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Special Instructions (Optional)</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special delivery instructions..."
              rows="3"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Save Details
            </button>
            {detailsSaved && (
              <button
                type="button"
                className="proceed-payment"
                onClick={handlePayment}
              >
                Proceed to Payment
              </button>
            )}
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default Checkout;
