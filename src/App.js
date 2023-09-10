import Header from "./Components/NavBar/Header";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import AboutUs from "./Components/Pages/AboutUs";
import SignUp from "./Components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./Store";
import MyProfile from "./Components/Pages/MyProfile";
import Forgotpassword from "./Components/Pages/Forgotpassword";
// import { useEffect } from "react";

function App() {
  const isauth = useSelector((state) => state.isAuthentication);
  console.log(isauth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     dispatch(authAction.login());
  //   }
  // }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isauth ? <Navigate to="/home" /> : <SignUp />}
        />
        SignUp
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Forgot-password" element={<Forgotpassword />} />
        <Route path="*" element="/"></Route>
      </Routes>
    </>
  );
}
export default App;