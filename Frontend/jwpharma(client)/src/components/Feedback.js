import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/feedback.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Feedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    reason: "",
    feedback: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch all feedback from the backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/feedback")
      .then((response) => {
        setFeedbackList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/feedback", formData)
      .then((response) => {
        toast.success("Feedback submitted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Add new feedback to the list
        setFeedbackList([...feedbackList, response.data]);

        // Clear form fields
        setFormData({
          name: "",
          email: "",
          rating: "",
          reason: "",
          feedback: "",
        });

        // Navigate to homepage after 2 seconds
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback. Please try again.");
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="feedback-form-container">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h1 className="text-center p-2">JW Pharma Feedback Form</h1>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email Id:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Rating
            </option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <label htmlFor="reason">Reason:</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Reason
            </option>
            <option value="1">1 - Delivery</option>
            <option value="2">2 - Product</option>
            <option value="3">3 - Service</option>
          </select>

          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Write your feedback here..."
            required
          ></textarea>

          <button className="feed" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
      {/* Feedback List Section
      <div className="feedback-list-container">
        <h2>Customer Feedback</h2>
        {feedbackList.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul className="feedback-list">
            {feedbackList.map((feedback) => (
              <li key={feedback.id} className="feedback-item">
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Rating:</strong> {feedback.rating}
                </p>
                <p>
                  <strong>Feedback:</strong> {feedback.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}

export default Feedback;
