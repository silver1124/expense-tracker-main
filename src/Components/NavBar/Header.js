import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../NavBar/Header.css";
import { authAction } from "../../Store/index";

const Header = () => {
  const isauth = useSelector((state) => state.isAuthenticated);
  const authEmail = localStorage.getItem("email");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleLogout() {
    await dispatch(authAction.logout());
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white navbar_header">
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
          {isauth && (
            <li className="nav-item">
              <Link className="nav-link" to="/welcome">
                Home
              </Link>
            </li>
          )}
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
        </ul>
      </div>
      {isauth && (
        <div className="dropdown ">
          <span
            className="btn  dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "rgb(30, 150, 247)" }}
          >
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>
          <div
            className="dropdown-menu animate__bounceIn"
            aria-labelledby="dropdownMenuButton"
            style={{ marginLeft: "-139px" }}
          >
            <div className="dropdown-item">
              <h6>Welcome</h6>
              <p>{authEmail}</p>
            </div>

            {isauth && (
              <Link className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Header;