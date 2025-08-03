import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/sidebar.css";
import userImage from "../assets/user.png"; // Fallback image

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(userImage);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          // ✅ Fetch User Details
          const userResponse = await axios.get(
            `http://localhost:9000/api/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(userResponse.data);

          // ✅ Fetch Profile Image
          const imageResponse = await axios.get(
            `http://localhost:9000/api/users/getProfileImage/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              responseType: "blob",
            }
          );

          // ✅ Set Profile Image or Default
          if (imageResponse.data.size > 0) {
            const imageUrl = URL.createObjectURL(imageResponse.data);
            setProfileImage(imageUrl);
          } else {
            setProfileImage(userImage);
          }
        } catch (error) {
          console.error("Error fetching user data or image:", error);
          setProfileImage(userImage); // Fallback image
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsOpen(true);
    navigate("/edit", { state: { userData } });
  };

  const handleOrderHistory = () => {
    setIsOpen(false);
    navigate("/orderHistory", { state: { userData } });
  };

  const handleTracking = () => {
    setIsOpen(false);
    navigate("/trackingOrder", { state: { userData } });
  };

  const handleLogin = () => {
    navigate("/loginpage");
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ×
        </button>

        {userData ? (
          <div className="profile-section">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-picture"
              onError={() => setProfileImage(userImage)}
            />
            <div className="user-info">
              <h2>User Info</h2>
              <ul className="info-list">
                <li>
                  <span className="info-link">Name: {userData.name}</span>
                </li>
                <li>
                  <span className="info-link">Email: {userData.email}</span>
                </li>
                <li>
                  <button className="edit-btnn" onClick={handleEdit}>
                    Edit Profile
                  </button>
                </li>
                <li className="button-container">
                  <button className="option-btn" onClick={handleOrderHistory}>
                    Order History
                  </button>
                  <button className="option-btn" onClick={handleTracking}>
                    Tracking Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="user-info">
            <h2>Welcome to JW Pharma Shop</h2>
            <p>Please login to view your profile.</p>
            <button className="option-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>

      <div
        className={`menu-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <button
        className={`toggle-btn ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        title="User Info"
      >
        ≡
      </button>
    </>
  );
}
