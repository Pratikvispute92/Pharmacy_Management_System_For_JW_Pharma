import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeliveryDetails() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    medicine: "",
    otherMedicine: "",
    quantity: 1,
    notes: "",
  });

  const [otherVisible, setOtherVisible] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "medicine") {
      setOtherVisible(value === "other");
    }
  };

  // Fetch all deliveries from backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/delivery")
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching deliveries:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const deliveryData = {
      name: formData.name,
      phoneNo: formData.phone, // Ensure this matches backend field name
      email: formData.email,
      address: formData.address,
      message: formData.notes, // Ensure this matches backend field name
      cartItems: cart,
    };

    console.log("Submitting data:", deliveryData); // Debugging

    try {
      const response = await fetch("http://localhost:9000/api/delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deliveryData),
      });

      if (response.ok) {
        toast.success("Delivery details saved successfully!");
        setDetailsSaved(true);
      } else {
        toast.error("Failed to save delivery details!");
      }
    } catch (error) {
      console.error("Error submitting delivery details:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section id="delivery-details" className="box">
      <ToastContainer />
      <h2>Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone No.:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Delivery Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="medicine">Medicine Type:</label>
        <select
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
          required
        >
          <option value="">Select Medicine</option>
          <option value="paracetamol">Paracetamol</option>
          <option value="ibuprofen">Ibuprofen</option>
          <option value="amoxicillin">Amoxicillin</option>
          <option value="aspirin">Aspirin</option>
          <option value="other">Other (Please specify)</option>
        </select>

        {otherVisible && (
          <input
            type="text"
            name="otherMedicine"
            value={formData.otherMedicine}
            onChange={handleChange}
            placeholder="Please specify"
          />
        )}

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label htmlFor="notes">Delivery Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special instructions..."
        ></textarea>

        <button type="submit">Save Delivery Details</button>
      </form>

      <h3>Existing Deliveries</h3>
      <ul>
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <li key={delivery.id}>
              {delivery.name} - {delivery.medicine} ({delivery.quantity}) -{" "}
              {delivery.address}
            </li>
          ))
        ) : (
          <p>No deliveries found.</p>
        )}
      </ul>
    </section>
  );
}

export default DeliveryDetails;
