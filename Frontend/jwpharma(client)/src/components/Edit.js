import React, { useState, useEffect } from "react";
import "../css/edit.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`http://localhost:9000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserDetails(response.data))
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data.");
        });
    } else {
      navigate("/homepage");
    }
  }, [userId, token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:9000/api/users/update/${userId}`,
        { ...userDetails, password: newPassword || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);
        await axios.post(
          `http://localhost:9000/api/users/uploadProfileImage/${userId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => navigate("/homepage"), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`http://localhost:9000/api/users/delete/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Profile deleted successfully!");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setTimeout(() => navigate("/loginpage"), 2000);
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile.");
      }
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Profile</h2>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Profile Picture:</label>
          <input
            type="file"
            onChange={handleProfileImageChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <span className="form-value">{userDetails.name}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <span className="form-value">{userDetails.email}</span>
          )}
        </div>

        {isEditing && (
          <div className="form-group">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
            />
          </div>
        )}

        <div className="button-container">
          {isEditing ? (
            <>
              <button className="btn save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn delete-btn" onClick={handleDelete}>
                Delete Profile
              </button>
            </>
          ) : (
            <button className="btn edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
