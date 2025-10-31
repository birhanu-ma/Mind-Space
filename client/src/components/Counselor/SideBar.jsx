import React from 'react'

function SideBar({setDashBoard}) {
  return (
    <div>
        <div className="sm:w-[45%]">
          <div className="flex flex-row mt-5 w-[80%] mx-auto">
            <img src="" alt="" className="w-25 h-25 rounded-full border mr-5" />
            <div className="mt-5">
              <p>name</p>
              <p>role</p>
            </div>
          </div>
          <div className="w-[80%] mx-auto">
            <p className="shadow-md rounded pl-6 py-5 my-3">
              View Assigned Youth
            </p>

            <p className="shadow-md rounded  pl-6 py-5 my-3">
              Respond to Forum Posts
            </p>

            <p className="shadow-md  rounded pl-6 py-5 my-3">
              Wellness Entry Review
            </p>
            <p className="shadow-md  rounded pl-6 py-5 my-3">Appointments </p>

            <div className="shadow-md flex justify-around flex-wrap  rounded">
              <button
                onClick={() => {
                  setDashBoard(true);
                }}
                className="shadow-md cursor-pointer  rounded py-5 my-3 px-3"
              >
                Dashboard
              </button>

              <button
               onClick={() => {
                  setDashBoard(false);
                }}
                className="shadow-md cursor-pointer  rounded py-5 my-3 px-3"
              >
                Add <br />
                New Appointement
              </button>
              <button
               onClick={() => {
                  setDashBoard(false);
                }}
                className="shadow-md cursor-pointer rounded py-5  px-7 my-3"
              >
                Update <br /> Appointment
              </button>
              <button 
               onClick={() => {
                  setDashBoard(false);
                }}
              className="shadow-md cursor-pointer rounded py-5  px-7 my-3">
                Delete <br /> Appointment
              </button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default SideBar