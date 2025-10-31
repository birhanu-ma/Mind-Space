import React from "react";

function Appointement() {
  return (
    <div className="bg-[#FAF7F0] p-20 ">
      <div className="flex bg-[#FFFF] p-5 justify-between items-center my-5  shadow-lg ">
        <h1 className="text-xl font-semibold">Booked/Taken</h1>
        <p>12:00 tuesday 21/2054</p>
      </div>
      <div className="flex p-5 bg-[#FFFF] justify-between items-center  my-5  shadow-lg">
        <h1 className="text-xl font-semibold">Booked/Taken</h1>
        <p>12:00 tuesday 21/2054</p>
      </div>
      <div className="flex p-5 bg-[#FFFF] justify-between items-center  my-5  shadow-lg ">
        <h1 className="text-xl font-semibold">Booked/Taken</h1>
        <p>12:00 tuesday 21/2054</p>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Book new session
        </button>
      </div>
    </div>
  );
}

export default Appointement;
