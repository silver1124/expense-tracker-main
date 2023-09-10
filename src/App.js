import Header from "./Components/NavBar/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Products from "./Components/Pages/Products";
import AboutUs from "./Components/Pages/AboutUs";
import SignUp from "./Components/SignUp";
import { useSelector } from "react-redux";
import MyProfile from "./Components/Pages/MyProfile";
import Forgotpassword from "./Components/Pages/Forgotpassword";
import Welcome from "./Components/Pages/Welcome";
// import { useEffect } from "react";

function App() {
  const isauth = useSelector((state) => state.isAuthentication);
  console.log(isauth);
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
          element={isauth ? <Navigate to="/Welcome" /> : <SignUp />}
        />
        SignUp
        <Route path="/Welcome" element={<Welcome />} />
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