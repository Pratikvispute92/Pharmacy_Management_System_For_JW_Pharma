import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // Update UI without reload
    navigate("/loginpage"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item" onClick={closeNav}>
              <Menu />
            </li>
            <li className="nav-item" onClick={closeNav}>
              <a className="navbar-brand nav-link">JW Pharma</a>
            </li>
            <li className="nav-item divider">|</li>
            <li className="nav-item" onClick={closeNav}>
              <Link className="nav-link" to="/homepage">
                Home
              </Link>
            </li>
            <li className="nav-item divider">|</li>
            <li className="nav-item" onClick={closeNav}>
              <Link className="nav-link" to="/feedback">
                Feedback
              </Link>
            </li>
          </ul>
          <div className="nav-buttons ms-auto">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/loginpage" className="login-btn" onClick={closeNav}>
                Login
              </Link>
            )}

            <Link to="/cart" className="cart-btn" onClick={closeNav}>
              <img
                src="https://cdn2.iconfinder.com/data/icons/neutro-essential/32/cart-256.png"
                alt="cart"
                title="Cart"
              />
            </Link>
            {/* <button className="theme-btn" onClick={closeNav}>
              ⭐
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
