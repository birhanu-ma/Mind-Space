import React from "react";


function UserDashBoard() {
  return (
    <div>
      <div className="sm:absolute shadow-sm sm:top-5 sm:right-0 sm:w-[55%] w-full sm:h-[90vh] mx-auto">
          <h1 className="text-center my-5"> User Profile</h1>
          <h2 className="text-center my-5">
            Well Come! <br />
            Name
          </h2>
              <div className="flex flex-col sm:flex-row justify-between mx-20">
              <div className="flex flex-col w-50 shadow-md h-30 justify-between">
                <p className="text-center my-5">Total User</p>
                <p className="text-center mb-5">12345</p>
              </div>
              <div className="flex flex-col w-50 shadow-md h-30 justify-between">
                <p className="text-center  my-5">Post Overview</p>
                <p className="text-center  mb-5">12345</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mx-20">
              <div className="flex flex-col shadow-md justify-between w-50 h-30">
                <p className="text-center my-5">Wellness Log Summary</p>
                <p className="text-center mb-5">12345</p>
              </div>
              <div className="flex flex-col shadow-md justify-between w-50 h-30">
                <p className="text-center my-5">Pending Appointment</p>
                <p className="text-center mb-5">12345</p>
              </div>
            </div>
        </div>
      </div>

  );
}

export default UserDashBoard;
