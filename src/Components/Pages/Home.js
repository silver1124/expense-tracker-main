import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <h5>Welcome to Exprense Tracker</h5>
          </div>
          <div className="col-md-8 " style={{ textAlign: "end" }}>
            <i>Your profile is Incomplete</i>
            <Link to="/MyProfile"> Complete Profile</Link>
            {/*  */}
          </div>
          <hr></hr>
          {/*  */}
        </div>
      </div>
    </>
  );
};
export default Home;