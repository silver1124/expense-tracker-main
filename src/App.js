import Header from "./Components/NavBar/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "./Components/Pages/AboutUs";
import SignUp from "./Components/SignUp";
import { useSelector } from "react-redux";
import MyProfile from "./Components/Pages/MyProfile";
import Forgotpassword from "./Components/Pages/Forgotpassword";
import Welcome from "./Components/Pages/Welcome";
import MyExpense from "./Components/Pages/MyExpense";
// import { useEffect } from "react";

function App() {
  const isauth = useSelector((state) => state.isAuthentication);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
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
          element={isauth ? <Navigate to="/welcome" /> : <SignUp />}
        />
        SignUp
        {!isauth && <Route path="/welcome" element={<Welcome />} />}
        <Route path="/login" element={<SignUp />} />
        {!isauth && <Route path="/MyProfile" element={<MyProfile />} />}
        {!isauth && <Route path="/my-expense" element={<MyExpense />} />}
        <Route path="/about-us" element={<AboutUs />} />
        {!isauth && (
          <Route path="/Forgot-password" element={<Forgotpassword />} />
        )}
        <Route path="*" element="/"></Route>
      </Routes>
    </>
  );
}
export default App;