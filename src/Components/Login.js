import React, { useRef } from "react";
import "../Asset/CSS/signUp.css";

import { Link } from "react-router-dom";

const Login = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjqtzeQ0bBhqeEQjr2qF9lN6WGfmSxoDk";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-cente">
          <div className=" col-lg-10 col-md-10 col-sm-10 col-xl-10 col signUpCard ">
            <div className=" ">
              <div className="text-center">
                <h1>Login</h1>
              </div>
              <div className="card-body">
                <form className="form-signin" onSubmit={formSubmitHandler}>
                  <div className="form-group ">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      className="form-control "
                      id="email"
                      placeholder="Email"
                      name="email"
                      ref={inputEmailRef}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="Password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Password"
                      ref={inputPasswordRef}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button "
                      className="col-lg-10 col-md-10 col-sm-10 col-xl-10 col btn btn-primary sigbupbtn"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center ">
                    <div
                      type="button "
                      className="col-lg-10 col-md-10 col-sm-10 col-xl-10 col account_col  btn mt-3 account_col"
                    >
                      You Haven't account ? <Link to={"/signup"}>Sign Up</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;