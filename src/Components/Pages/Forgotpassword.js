import React, { useRef, useState } from "react";
import "../Pages/Forgotpassword.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const InputEmailRef = useRef();

  const ChangePasswordHandler = (event) => {
    event.preventDefault();
    const newEmail = InputEmailRef.current.value;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSWFv8wPRt3w95-Ssm_qAutPb3_WeS1IU`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: newEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => {
        setMessage("Email Send your Email Id Check your Email Address");
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      });
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
            <label htmlFor="pass">Enter Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email Address .."
              ref={InputEmailRef}
              required
            />
          </div>
          <div className="action text-center">
            <button className="btn btn-primary">Send Link</button>
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