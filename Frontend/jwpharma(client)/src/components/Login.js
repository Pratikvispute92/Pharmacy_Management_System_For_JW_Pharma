import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/login",
        {
          email,
          password,
        }
      );

      const { message, token, userId } = response.data;

      localStorage.setItem("token", token);
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      toast.success(message);
      setTimeout(() => {
        window.location.href = "/homepage";
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => setIsFlipped(false), 1000); // Flip after success
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/send-otp",
        { email }
      );
      toast.info(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:9000/api/users/reset-password",
        {
          email,
          newPassword: password,
          otp,
        }
      );
      toast.success(response.data.message);
      setIsForgotPassword(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <div className="flip-card-container">
      <ToastContainer />
      {!isForgotPassword ? (
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="card-front">
            <h2>Login Form</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="submit-btn">
                Sign In
              </button>
              <div className="foot">
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </button>
                or
                <button
                  type="button"
                  className="signup-link"
                  onClick={() => setIsFlipped(true)}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="card-back">
            <h2>Sign Up Form</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="submit-btn">
                Sign Up
              </button>
              <div className="foot">
                Already have an account?{" "}
                <button
                  type="button"
                  className="login-link"
                  onClick={() => setIsFlipped(false)}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="forgot-password-form">
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="submit-btn"
              disabled={isOtpSent}
            >
              {isOtpSent ? "OTP Sent ✅" : "Send OTP"}
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="submit-btn">
              Reset Password
            </button>
            <button
              type="button"
              className="login-link"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FlipCard;
