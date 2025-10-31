import React from "react";

function CounselorDashBoard() {
  return (
    <div>
      <div className=" sm:absolute shadow-sm sm:top-5 sm:right-0 sm:w-[55%] sm:h-[90vh] m-auto">
        <div className="w-full sm:w-[55%] m-auto">
          <h1 className="text-center my-5"> User Profile</h1>
          <h2 className="text-center my-5">
            Well Come! <br />
            Name
          </h2>

          <div className="flex flex-col w-full sm:flex-row gap-5 m-auto">
            <div className="text-center m-auto rounded py-5">
              <h1>List of youth with recent activity</h1>
              <p className="shadow-md rounded  py-5 m-auto">Elias Vance</p>
              <p className="shadow-md rounded  py-5 m-auto">Seraphina Bell</p>
              <p className="shadow-md rounded  py-5 m-auto">Jasper Reed</p>
              <p className="shadow-md rounded  py-5 m-auto">Aurora Hayes</p>
            </div>

            <div className="text-center m-auto rounded py-5">
              <h1>Upcomming Appointments</h1>
              <p className="shadow-md rounded  py-5 m-auto">
                View Assigned Youth
              </p>
              <p className="shadow-md rounded  py-5 m-auto">
                View Assigned Youth
              </p>
              <p className="shadow-md rounded  py-5 m-auto">
                View Assigned Youth
              </p>
              <p className="shadow-md rounded  py-5 m-auto">
                View Assigned Youth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounselorDashBoard;
