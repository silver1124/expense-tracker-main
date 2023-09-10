import React, { useRef, useState } from "react";
import "../Asset/CSS/signUp.css";
import { useDispatch } from "react-redux";
import { authAction } from "../Store";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
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
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.idToken);
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
      <div className="container mt-5">
        <div className="row align-items-cente">
          <div className=" col-lg-10 col-md-10 col-sm-10 col-xl-10 col signUpCard ">
            <div className=" ">
              <div className="text-center">
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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

                  {!isLogin && (
                    <div className="form-group">
                      <label for="Confirm_Password">Confirm Password</label>
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
                  <div className="text-center ">
                    <div
                      type="button "
                      className="col-lg-10 col-md-10 col-sm-10 col-xl-10 col account_col  btn mt-3 account_col"
                      // onClick={switchAuthModeHandler}
                    >
                      {isLogin ? (
                        <div>
                          Don't have an account ?{" "}
                          <span onClick={() => setIsLogin(false)}>
                            Register
                          </span>
                        </div>
                      ) : (
                        <div>
                          Don't have an account ?{" "}
                          <span onClick={() => setIsLogin(true)}>Login</span>
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