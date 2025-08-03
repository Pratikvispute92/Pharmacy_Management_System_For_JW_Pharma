import React, { useState } from "react";
import axios from "axios";
import "../css/contact.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/api/contact-us",
        formData
      );
      if (response.status === 201) {
        toast.success("Message sent successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <main>
        <section className="contact-container">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us!</p>

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button className="cont" type="submit">
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
