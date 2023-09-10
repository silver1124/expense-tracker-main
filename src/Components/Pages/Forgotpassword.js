import React, { useRef, useState } from "react";
import "../Pages/Forgotpassword.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const [message, setMessage] = useState("");
  const InputPasswordRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const ChangePasswordHandler = (event) => {
    event.preventDefault();
    const newPassword = InputPasswordRef.current.value;
    console.log(newPassword);

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSWFv8wPRt3w95-Ssm_qAutPb3_WeS1IU`;

    const data = {
      idToken: token,
      password: newPassword,
      returnSecureToken: false,
    };

    console.log(data);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setMessage("Reset Your Password Sucessfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
  };
  return (
    <div>
      <div className=" text-center mt-3 animate__bounceIn">
        {message && (
          <span className="reset_password">
            <i className="fa fa-check mr-2" aria-hidden="true"></i> {message}
          </span>
        )}
      </div>
      <form className="form" onSubmit={ChangePasswordHandler}>
        <div className="reset_pass animate__bounceIn">
          <div className="control">
            <label htmlFor="pass">Reset Password</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              placeholder="Reset Password .."
              ref={InputPasswordRef}
              required
            />
          </div>
          <div className="action text-center">
            <button className="btn btn-primary">Reset Password</button>
          </div>

          <div className="text-center mt-2">
            Already a user?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;