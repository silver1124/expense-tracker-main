import React, { useRef } from "react";

const MyProfile = () => {
  const InputusernameRef = useRef();
  const InputProfilePhotoRef = useRef();

  const contactDetailHandler = (e) => {
    e.preventDefault();
    const username = InputusernameRef.current.value;
    const ProPhoto = InputProfilePhotoRef.current.value;
    // const token = localStorage.getItem("token");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDxVTE5Dd9_CHnm7umXRkkgSpfAgS7rUAM",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          ProPhoto: ProPhoto,
          //   idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .then((data) => console.log(data));
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4">
          <p className="font-weight-bold mt-5">
            Winner never quite , Quitters never win
          </p>
        </div>
        <div className="col-md-8 " style={{ textAlign: "end" }}>
          <div>
            <i>
              Your Profile 65% completed
              <p>A Complete Profile has higher change of landing a job</p>
            </i>{" "}
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@getbootstrap"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="row">
        <div className="col-md-12 mt-5">
          <h4>Contact Detail</h4>
          <form
            onSubmit={contactDetailHandler}
            className=" mt-5 border rounded p-3 bg-light "
            style={{
              boxShadow: " rgba(0, 0, 0, 0.1) 0px 10px 50px",
            }}
          >
            <div className="form-group">
              <label htmlFor="name" className="font-weight-bold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name ..."
                ref={InputusernameRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photourl" className="font-weight-bold">
                Profile Photo URL
              </label>
              <input
                type="text"
                id="photourl"
                className="form-control"
                placeholder="Profile Photo Url ..."
                ref={InputProfilePhotoRef}
              />
            </div>

            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;