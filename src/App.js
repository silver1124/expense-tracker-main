import Header from "./Components/NavBar/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import AboutUs from "./Components/Pages/AboutUs";
import SignUp from "./Components/SignUp";
import { useSelector } from "react-redux";
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
          element={isauth ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;