import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const token = localStorage.getItem("token");
  const verifyEmailHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxVTE5Dd9_CHnm7umXRkkgSpfAgS7rUAM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    ).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          const errorMsg = data.error.errors[0].message;
          alert(errorMsg);
        } else {
          alert("Email Verification sent! Check your mail box");
        }
      });
    });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Welcome to Exprense Tracker</h5>
        </div>
        <div className="col-md-8 " style={{ textAlign: "end" }}>
          <i>Your profile is Incomplete</i>
          <Link to="/MyProfile" className="btn btn-primary ml-3">
            {" "}
            Complete Profile
          </Link>

          <div>
            <button
              type="button"
              className="veryfyBtn btn border bg-white border-primary text-primary mt-4"
              onClick={verifyEmailHandler}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
            >
              Verify Email
            </button>
          </div>
        </div>

        <hr></hr>
      </div>
    </div>
  );
};

export default Welcome;