import React, { useRef, useState } from "react";
import "../Asset/CSS/signUp.css";
import { useDispatch } from "react-redux";
import { authAction } from "../Store";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useNavigate();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputCpasswordRef = useRef();
  const dispatch = useDispatch();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    let cpassword;
    if (!isLogin) {
      cpassword = inputCpasswordRef.current.value;
    } else {
      cpassword = inputPasswordRef.current.value;
    }

    if (password === cpassword) {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxVTE5Dd9_CHnm7umXRkkgSpfAgS7rUAM";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxVTE5Dd9_CHnm7umXRkkgSpfAgS7rUAM";
      }
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Check your Password and Email";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", data.email);
        dispatch(authAction.login());
        history("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
    if (!isLogin) {
      inputCpasswordRef.current.value = "";
    }
  } else {
    alert("Password doesnot match");
  }
};
return (
  <>
    <div className="container mt-5 mb-5">
      <div className="row align-items-cente">
        <div className=" col-lg-10 col-md-10 col-sm-10 col-xl-10 col signUpCard ">
          <div
            className=""
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              borderRadius: "10px",
            }}
          >
            <div className="text-center">
              <h1>
                {isLogin ? (
                  <i className="fa fa-sign-in mt-5" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-user-plus mt-5" aria-hidden="true"></i>
                )}
              </h1>
            </div>
            <div
              className="card-body"
              style={{ maxWidth: "25rem", marginLeft: "17rem" }}
            >
              <form className="form-signin" onSubmit={formSubmitHandler}>
                <div className="form-group ">
                  <label htmlFor="email" className="font-weight-bold">
                    <i className="fa fa-envelope ml-2"></i> Email address
                  </label>
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
                <div className="form-group">
                  <label htmlFor="Password" className="font-weight-bold">
                    <i className="fa fa-key ml-2 mr-1"></i>Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                    ref={inputPasswordRef}
                    required
                  />
                </div>
                {!isLogin && (
                  <div className="form-group">
                    <label
                      htmlFor="Confirm_Password"
                      className="font-weight-bold"
                    >
                      <i className="fa fa-key ml-2 mr-1"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="Confirm_Password"
                      placeholder=" Confirm Password"
                      ref={inputCpasswordRef}
                      required
                    />
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="button "
                    className="col-lg-10 col-md-10 col-sm-10 col-xl-10 col btn btn-primary sigbupbtn"
                  >
                    {isLogin ? "Login" : "SignUp"}
                  </button>
                </div>
                {isLogin && (
                  <div className="text-center mt-3">
                    <Link
                      to="/Forgot-password"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                )}

                <div className="text-center ">
                  <div
                    type="button "
                    className="col-lg-10 col-md-10 col-sm-10 col-xl-10 col account_col  btn mt-3 mb-3 account_col"
                    // onClick={switchAuthModeHandler}
                  >
                    {isLogin ? (
                      <div>
                        Don't have an account ?{" "}
                        <span onClick={() => setIsLogin(false)}>
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </span>
                      </div>
                    ) : (
                      <div>
                        Don't have an account ?{" "}
                        <span onClick={() => setIsLogin(true)}>
                          <i class="fa fa-sign-in" aria-hidden="true"></i>
                        </span>
                      </div>
                    )}
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
export default SignUp;