import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const isauth = useSelector((state) => state.isAuthenticated);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        className="navbar-brand"
        to="/"
        style={{ color: "#1e96f7", fontWeight: "bolder" }}
      >
        Expence Tracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          {isauth && (
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link " to="/about-us">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            {isauth && (
              <Link className="nav-link " to="">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;